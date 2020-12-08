import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit, OnDestroy {

  public isAuthenticated = false;
  public isOrg = false;
  public user: User;
  public isLoading = false;
  public userIsAuthenticated = false;
  public userIsOrg = false;

  private authStatusSub: Subscription;
  private orgStatusSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.isLoading = true;
    this.isOrg = this.authorizationService.getIsOrg();
    this.userIsAuthenticated = this.authorizationService.getIsAuth();
    this.orgStatusSub = this.authorizationService.getOrgStatusListener().subscribe(isOrg => {
      this.userIsOrg = isOrg;
    })
    this.authStatusSub = this.authorizationService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      });
    this.isLoading = false;
  }

  getUser() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  updateUser() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.updateUser(userId, this.user).subscribe(user => {
      this.router.navigate(['/city-care/users-profile']);
    })
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.orgStatusSub.unsubscribe();
  }
}
