import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
})
export class SiteHeaderComponent implements OnInit {
  user: IUser | null = null;
  showSignOut: boolean = false;
  constructor(private userSvc: UserService) {}

  ngOnInit(): void {
    this.userSvc.getUser().subscribe((user) => (this.user = user));
  }

  toggleSignOut() {
    this.showSignOut = !this.showSignOut;
  }

  signOut() {
    this.userSvc.signOut();
    this.user = null;
    this.showSignOut = false;
  }
}
