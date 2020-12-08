import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { RequestService } from '../../shared/services/request.service';
import { Request } from '../../shared/models/request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit, OnDestroy {

  public isOrg = false;
  public userIsOrg = false;
  public isLoading = false;
  public isAuthenticated = false;
  public userIsAuthenticated = false;

  public request: Request;

  private authStatusSub: Subscription
  private orgStatusSub: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.authStatusSub = this.authorizationService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
    this.isOrg = this.authorizationService.getIsOrg();
    this.orgStatusSub = this.authorizationService.getAuthStatusListener().subscribe(isOrg => {
      this.userIsOrg = isOrg;
    })
    const requestId = +this.route.snapshot.paramMap.get('id');
    this.requestService.getUserRequest(requestId).subscribe(request => this.request = request);
    this.isLoading = false;
  }

  updateRequest() {
    const requestId = +this.route.snapshot.paramMap.get('id');
    this.requestService.updateRequest(requestId, this.request).subscribe(request => {
      this.router.navigate(['/city-care/users-profile'])
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.orgStatusSub.unsubscribe();
  }
}
