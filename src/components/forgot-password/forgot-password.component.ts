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
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  resetPassword() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    // AuthService üzerinden reset password işlemini yapın
    this.authService.resetPassword(this.username, this.password).subscribe(response => {
      if (response.success) {
        console.log('Password reset successful');
        // Başarılı resetten sonra yapılacak işlemler
      } else {
        console.error('Password reset failed:', response.message);
      }
    });
  }
}