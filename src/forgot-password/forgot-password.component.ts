import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BtnComponent } from "../forms/btn/btn.component";
import { InputComponent } from "../forms/input/input.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BtnComponent, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  username: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    if (this.username.trim() === '' || this.newPassword.trim() === '') {
      alert('Kullanıcı adı ve yeni şifre boş olamaz.');
      return;
    }

    if (this.authService.resetPassword(this.username, this.newPassword)) {
      alert('Şifre başarıyla güncellendi.');
      this.router.navigate(['/login']);
    } else {
      alert('Kullanıcı bulunamadı.');
    }
  }
}
