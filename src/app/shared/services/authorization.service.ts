import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Org } from '../models/org.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private authApi: string = 'http://uscitycare-env.eba-cjgmkkyx.us-east-2.elasticbeanstalk.com/users';//Define the backend route

  public users: User[]; //Declare the users as an empty array
  public orgs: Org[];
  private isAuthenticated = false; //Set the authentication status as false
  private userIsAuthenticated = false;
  private token: string; //Declare the token as a string
  private tokenTimer: any; //Declare the token timer
  private userId: string; //Declare the user id
  private isOrg: any; //Declare the isOrg validator
  private isAdmin: any; //Declare the is admin validator
  private authStatusListener = new Subject<boolean>(); //Set the authStatusListener as a subject boolean value
  private orgStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {

   }

  getToken() {
    //get the token
    return this.token;
  }
  getIsAuth() {
    //check to see if the user is authenticated
    return this.isAuthenticated;
  }
// checkAuthorization() {
//   return this.userIsAuthenticated;
// }
  getUserId() {
    //Get the user Id
    return this.userId;
  }

  getIsOrg() {
    //Get the individual status as organization or not
    return this.isOrg;
  }

  getIsAdmin() {
    //Get the individual status as admin or not
    return this.isAdmin;
  }

  getAuthStatusListener() {
    //check the users status & return it as an observable
    return this.authStatusListener.asObservable();
  }
  getOrgStatusListener() {
    return this.orgStatusListener.asObservable();
  }
  //Set the boolean value of isOrg
  setIsOrg(e: boolean) {
    return this.isOrg = e;
  }
  //CREATE a new user
  registerUser(user: User) {
    return this.http.post(`${this.authApi}/register`, user).subscribe(result => {
      this.router.navigate(['/city-care/home']);
    }, error => {

    });
  }
  //Log a user in with a username
  usernameLogin(user: any) {
    return this.http.post(`${this.authApi}/usernameLogin`, user).subscribe(
      (res: any) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn; //Declare how long the token lasts variable and assign the token time to it
          this.setAuthTimer(expiresInDuration); //Set the authorization timer
          this.isAuthenticated = true; //Set the status of the user as authenticated or verified
          this.userIsAuthenticated = true;
          this.userId = res.userId; //Store the user id from the response in a variable called userId
          this.isOrg = res.isOrg; //Store the status of the user in the isOrg variable
          this.isAdmin = res.isAdmin; //Stores the adminstrative status of the user in the is admin variable
          this.authStatusListener.next(true); //Turn the authorization status subject on to listen for the users activities
          this.orgStatusListener.next(true);
          const now = new Date(); //get the current time stamp
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          ); //create the expiration date
          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.isOrg,
            this.isAdmin
          ); // executes the method saveAuthData
        }
        localStorage.setItem('access-token', res.token); //Set the access token to the token recieved in the response header
        this.router.navigate(['/city-care/users-profile']); //Navigate the user to their profile page
      },
      (error) => {
        //if the user is not logged in or authenticated turn the authorization status listener off
        this.authStatusListener.next(false);
        this.orgStatusListener.next(false);
      }
    );
  }
  //Log a user in with email
  emailLogin(user: any) {
    //Log a user in
    return this.http.post(`${this.authApi}/emailLogin`, user).subscribe(
      (res: any) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn; //Declare how long the token lasts variable and assign the token time to it
          this.setAuthTimer(expiresInDuration); //Set the authorization timer
          this.isAuthenticated = true; //Set the status of the user as authenticated or verified
          this.userIsAuthenticated = true;
          this.userId = res.userId; //Store the user id from the response in a variable called userId
          this.isOrg = res.isOrg; //Store the status of the user in the isOrg variable
          this.isAdmin = res.isAdmin; //Stores the adminstrative status of the user in the is admin variable
          this.authStatusListener.next(true); //Turn the authorization status subject on to listen for the users activities
          this.orgStatusListener.next(true);
          const now = new Date(); //get the current time stamp
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          ); //create the expiration date
          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.isOrg,
            this.isAdmin
          ); // executes the method saveAuthData
        }
        localStorage.setItem('access-token', res.token); //Set the access token to the token recieved in the response header
        this.router.navigate(['/city-care/users-profile']); //Navigate the user to their profile page
      },
      (error) => {
        //if the user is not logged in or authenticated turn the authorization status listener off
        this.authStatusListener.next(false);
        this.orgStatusListener.next(false);
      }
    )
  }
  //Try to automatically initialize the authorization status when the app starts
  autoAuthUser() {
    const authInformation = this.getAuthData(); //Create a variable to store the authorization data
    if (!authInformation) {
      //don't return anything if there isn't any authorization information
      return;
    }
    const now = new Date(); //store the time stamp in a variable called now
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); //Store the expiration time minus the time now
    console.log(authInformation, expiresIn); //log the authorization information and the amount of time left before expire to the console
    if (expiresIn > 0) {
      // if the expiration time is greate than zero execute the following code
      this.token = authInformation.token; //set the token to the token in the local storage
      this.userIsAuthenticated = true;
      this.isAuthenticated = true; //set the is authenticated variable to true
      this.userId = authInformation.userId; //Set the user Id to the user id fetched from local storage
      this.isOrg = authInformation.isOrg; //set the is org validator based on local storage
      this.isAdmin = authInformation.isAdmin; //set the is admin validator to the one in local storage
      this.setAuthTimer(expiresIn / 1000); //Divide here because this is in milliseconds
      this.authStatusListener.next(true);
      this.orgStatusListener.next(true);
    }
  }
  //Log a user out, method should remove everything from local storage
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isOrg = false;
    this.authStatusListener.next(false);
    this.orgStatusListener.next(false);
    clearTimeout(this.tokenTimer); //Clears the token timer out when the logout method is called.
    this.clearAuthData();//clear the local storage
    this.userId = null; //Ensures the user Id is reset correctly after a user logs out.
    window.location.reload()
    this.router.navigate(['/city-care/home']);
  }

  //Create the authorization timer
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); //set timeout works in milliseconds so multiplies 3600 or 1hr by 1000
  }

  //Save authorization data, token and expiration time in local storage
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    isOrg: any,
    isAdmin: any
  ) {
    localStorage.setItem('access-token', token); //stores the token in local storage
    localStorage.setItem('expirationDate', expirationDate.toISOString()); //stores the expiration date in local storage
    localStorage.setItem('userId', userId); //saves the user id to local storage
    localStorage.setItem('isOrg', isOrg); //Saves the user status to local storage
    localStorage.setItem('isAdmin', isAdmin); //Save the administrator status to local storage
  }

  // //clear out local storage of any information pertaining to authentication
  private clearAuthData() {
    localStorage.removeItem('access-token'); //Removes the toke from local storage
    localStorage.removeItem('expirationDate'); //removes the expiration date from local storage
    localStorage.removeItem('userId'); //removes the user Id from local storage
    localStorage.removeItem('isOrg'); //removes the user Id from local storage
    localStorage.removeItem('isAdmin'); //Removes the administrators status from local storage
  }
  //Get the authorization information stored in local storage.
  private getAuthData() {
    const token = localStorage.getItem('access-token'); //Retrieve the token from local storage
    const expirationDate = localStorage.getItem('expirationDate'); //Retrieve the expiration date from local storage
    const userId = localStorage.getItem('userId'); //Retrieve the user id from local storage
    const isOrg = localStorage.getItem('isOrg'); //Retrieve the individual status or type of user from local storage
    const isAdmin = localStorage.getItem('isAdmin'); //Retrieve the individual administrator validator from local storage
    if (!token || !expirationDate) {
      //Check to see if there is not a token or expiration
      return; //doesn't return anything if the above condition is true
    }
    return {
      //returns a javascript object with the tokken and a new date object
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId, //Add the user id to the return
      isOrg: isOrg, //Add the user status to the return
      isAdmin: isAdmin, //Add the user secondary status to the return
    };
  }
}
