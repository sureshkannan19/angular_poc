import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  user: IUser | null = null;
  showSignOutMenu: boolean = false;

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    console.log("Inside Site Header On Init")
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        console.log("Inside Site Header Observer: ", user)
      }
    });
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.userService.signOut();
    console.log("Signed out")
  }

}
