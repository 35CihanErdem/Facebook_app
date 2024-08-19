import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule,Button],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  username: string = '';
  newPassword: any = '';
  password: any;
  message: string = '';
 

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
   
    this.authService.update(this.username,this.password, this.newPassword).subscribe(response => {
      if (response.success) {
        this.message = 'Password updated successfully.';
        this.router.navigate(['/login']);
      } else {
        this.message = response.message || 'An error occurred during password reset.';
      }
    });
  }
}
