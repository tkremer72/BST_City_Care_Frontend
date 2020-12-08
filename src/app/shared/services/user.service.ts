import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersApi: string = 'http://uscitycare-env.eba-cjgmkkyx.us-east-2.elasticbeanstalk.com/users';//Define the backend route

  public user: User;


  constructor(private http: HttpClient) { }

  //GET a user/organization profile
  getProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.usersApi}/profile`)
  }
  //GET the user by the user id for the update profile page
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.usersApi}/${userId}`);
  }
  //UPDATE a users/orgs information
  updateUser(userId: number, user: any): Observable<User> {
    return this.http.put<User>(`${this.usersApi}/${userId}`, user,);
  }
  //this route doesnt seem to work right
  getThisOrgUser(org_id: number): Observable<User> {
    return this.http.get<User>(`${this.usersApi}/${org_id}`)
  }
  getThisUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.usersApi}/${userId}`)
  }

}
