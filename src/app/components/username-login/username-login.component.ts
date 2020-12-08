import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';


@Component({
  selector: 'app-username-login',
  templateUrl: './username-login.component.html',
  styleUrls: ['./username-login.component.css']
})
export class UsernameLoginComponent implements OnInit, OnDestroy {

  public user: User = new User();
  public isLoading = false;
  public isAuthenticated = false;
  
  private authStatusSub: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authorizationService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      })

  }

  usernameLogin() {
    this.authorizationService.usernameLogin(this.user);
  }


  onLogout() {
    this.authorizationService.logout();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
