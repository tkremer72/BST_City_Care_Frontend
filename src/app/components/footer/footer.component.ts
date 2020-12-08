import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public isAuthenticated = false;
  public isOrg = false;
  public userIsAuthenticated = false;
  public user: User;

  private authListenerSub: Subscription; //listen for authentication

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.isOrg = this.authorizationService.getIsOrg();
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.authListenerSub = this.authorizationService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
    this.isLoading = false;
  }
  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
