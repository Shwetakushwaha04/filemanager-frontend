import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  showMainLayout = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.themeService.loadTheme();
    this.showMainLayout = this.authService.isLoggedIn();
  }

  loginSuccess() {
    this.showMainLayout = true;
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout(); // removes token
    this.showMainLayout = false;
    this.router.navigate(['/login']);
  }
}
