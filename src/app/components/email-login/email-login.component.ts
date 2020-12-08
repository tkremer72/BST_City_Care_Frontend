import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';


@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public isAuthenticated = false;
  public user: User = new User();

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

  emailLogin() {
    this.authorizationService.emailLogin(this.user);
  }


  onLogout() {
    this.authorizationService.logout();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
