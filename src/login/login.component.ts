import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from "../forms/btn/btn.component";
import { InputComponent } from "../forms/input/input.component";
import { RegisterComponent } from '../register/register/register.component'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BtnComponent, InputComponent,RegisterComponent,RouterModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None// Stil kapsama ayarı
})
export class LoginComponent  {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  login() {

    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Lütfen bilgi girişi yapınız');
      return;
    }
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Lütfen Kayıt olunuz');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onUsernameChange(newUsername: string) {
    this.username = newUsername;
  }

  onPasswordChange(newPassword: string) {
    this.password = newPassword;
  }

  btnlogin() {
    this.login();
  }

  btnregister() {
    this.navigateToRegister();
  }
}

