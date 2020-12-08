import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-bio',
  templateUrl: './team-bio.component.html',
  styleUrls: ['./team-bio.component.css']
})
export class TeamBioComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public isAuthenticated = false;
  public userIsAuthenticated = false;
  public userIsOrg = false;

  private autStatusSub: Subscription;
  private orgStatusSub: Subscription;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsOrg = this.authorizationService.getIsOrg();
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.autStatusSub = this.authorizationService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
    this.orgStatusSub = this.authorizationService.getOrgStatusListener().subscribe(isOrg => {
      this.userIsOrg = isOrg;
    })
    this.isLoading = false;
  }
  ngOnDestroy() {
    this.autStatusSub.unsubscribe();
  }
}
