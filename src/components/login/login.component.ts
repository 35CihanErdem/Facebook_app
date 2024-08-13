import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import {Router,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BtnComponent } from '../../forms/btn/btn.component'; 
import { InputComponent } from '../../forms/input/input.component'; 
import { RegisterComponent } from '../../register/register/register.component'; 
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BtnComponent, InputComponent,RegisterComponent,RouterModule,Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None// Stil kapsama ayarı
})
export class LoginComponent  {

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}



  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          // Başarılı giriş durumunda, kullanıcıyı ana sayfaya yönlendirin
          this.router.navigate(['/home']);
        } else {
            this.router.navigate(['/register']);
        }
      },
      error => {
        this.errorMessage = 'An error occurred during registration';
        this.router.navigate(['/register']);
      }
    );
  }
}

