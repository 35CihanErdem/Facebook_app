import { Component, ViewEncapsulation } from '@angular/core';
import { BtnComponent } from '../../forms/btn/btn.component';
import { InputComponent } from '../../forms/input/input.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BtnComponent, 
    InputComponent,
    RouterModule,
    ButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Düzeltildi
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password cannot be empty.';
      return;
    }
    this.authService.register(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          // Kayıt başarılı, login sayfasına yönlendir
          this.router.navigate(['/login']);
        } else {
          // Kayıt başarısız
          this.errorMessage = response.message || 'Registration failed';
        }
      },
      error => {
        this.errorMessage = 'An error occurred during registration';
        console.error('Register error:', error);
      }
    );
  }
}
