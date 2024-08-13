import { Component, ViewEncapsulation } from '@angular/core';
import { BtnComponent } from '../../forms/btn/btn.component';
import { InputComponent } from '../../forms/input/input.component';
import { RouterModule,Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BtnComponent,InputComponent,
    RouterModule,Button,
    FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
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
