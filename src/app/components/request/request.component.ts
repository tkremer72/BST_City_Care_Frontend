import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Request } from '../../shared/models/request.model';
import { RequestService } from 'src/app/shared/services/request.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit, OnDestroy {

  public isOrg = false;
  public userIsOrg = false;
  public submitted = false;
  public isLoading = false;
  public isAuthenticated = false;
  public userIsAuthenticated = false;

  public request: Request = new Request();

  private authStatusSub: Subscription;
  private orgStatusSub: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.isOrg = this.authorizationService.getIsOrg();
    this.orgStatusSub = this.authorizationService.getOrgStatusListener().subscribe(isOrg => {
    this.userIsOrg = isOrg
    });
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.authStatusSub = this.authorizationService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.isLoading = false;
  }

  createRequest() {
    this.requestService.createRequest(this.request).subscribe(result => {
      this.router.navigate(['/city-care/users-profile']);
    });
}

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.orgStatusSub.unsubscribe();
  }
}
