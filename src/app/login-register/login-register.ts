import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-register.html'
})
export class LoginRegister {
  isLogin = true;
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

   submit() {
    if (this.isLogin) {
      // LOGIN
      this.authService.login(this.email, this.password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => alert('Login failed')
      });
    } else {
      // REGISTER
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      this.authService.register(this.name, this.email, this.password).subscribe({
        next: () => {
          alert('Account created successfully');
          this.isLogin = true;
        },
        error: () => alert('Registration failed')
      });
    }
  }
}
