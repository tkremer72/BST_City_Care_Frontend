import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../shared/services/authorization.service'
import { Listing } from '../../shared/models/listing.model';
import { ListingService } from '../../shared/services/listing.service';
import { Org } from 'src/app/shared/models/org.model';
import { RequestService } from '../../shared/services/request.service';
import { Request } from '../../shared/models/request.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-site-tally',
  templateUrl: './site-tally.component.html',
  styleUrls: ['./site-tally.component.css']
})
export class SiteTallyComponent implements OnInit, OnDestroy {

  public orgs: Org[] = [];
  public users: User[] = [];
  public listings: Listing[] = [];
  public requests: Request[] = [];
  public isLoading = false;
  public isOrg = false;
  public userIsOrg = false;
  public isAuthenticated = false;
  public userIsAuthenticated = false;

  private authStatusSub: Subscription;
  private orgStatusSub: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private listingService: ListingService,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getEverythingOrgs();
    this.getEverythingUsers();
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.authStatusSub = this.authorizationService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
    this.isOrg = this.authorizationService.getIsOrg();
    this.orgStatusSub = this.authorizationService.getOrgStatusListener()
      .subscribe(isOrg => {
        this.userIsOrg = isOrg
      });
    this.isLoading = false;
  }


  getEverythingOrgs() {
    this.listingService.getEverythingOrgs().subscribe((responses: any) => {
    // console.log(responses.listings[0].listings)
    this.orgs = responses.listings
    })
  }
  getEverythingUsers() {
    this.requestService.getEverythingUsers().subscribe((results: any) => {
      //  console.log(results.requests[0].requests)
      this.users = results.requests
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.orgStatusSub.unsubscribe();
  }

}
