import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public user: User;
  public isLoading = false;
  public isAuthenticated = false;
  public userIsAuthenticated = false;
  
  private authListenerSub: Subscription; //listen for authentication
  private orgListenerSub: Subscription;//Listen for whether a user is an organizatio or a user. 

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.authListenerSub = this.authorizationService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
    this.isLoading = false;
  }


  onLogout() {
    this.authorizationService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
    this.orgListenerSub.unsubscribe();
  }
}

