import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: IUser | null = null;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    // Initialize any data or services needed for the home component
    console.log('Home component initialized');
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.navigateToSignInOrProceed(user);
      },
      error: (e) => { this.user = null; this.navigateToSignInOrProceed(null); }
    })
  }

  navigateToSignInOrProceed(user: IUser | null) {
    if (!user) {
      this.router.navigate(['/signIn'])
    }
  }


}
