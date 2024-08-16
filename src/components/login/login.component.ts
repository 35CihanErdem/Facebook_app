import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from '../../forms/btn/btn.component'; 
import { InputComponent } from '../../forms/input/input.component'; 
import { RegisterComponent } from '../register/register.component'; 
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BtnComponent, InputComponent, RegisterComponent, RouterModule, Button,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None // Stil kapsama ayarı
})
export class LoginComponent  {
  username: string = '';
  password: string = '';
  errorMessage: string="";
 


  constructor(private authService: AuthService, private router: Router) {}


  register() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password cannot be empty.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      error => {
        this.errorMessage = 'An error occurred during login.';
      }
    );
  }
}
