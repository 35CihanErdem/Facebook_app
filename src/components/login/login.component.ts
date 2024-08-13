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
  errorMessage: string | null = null;
  showAccountForm: boolean = false; 

  accounts: any[] = []; 
 

  constructor(private authService: AuthService, private router: Router) {}

  login(account: any) {
    // Hesap ile giriş yapma işlemleri
    console.log('Giriş yapılan hesap:', account);
  }

  removeAccount(account: any) {
    // Hesabı kaldır
    this.accounts = this.accounts.filter(acc => acc !== account);
  }

  showAddAccount() {
    this.showAccountForm = !this.showAccountForm; // Hesap formunu aç/kapat
  }

  onAddAccount() {
    // Yeni hesap ekleme işlemlerini burada yapabilirsiniz.
    console.log('Yeni hesap eklendi');
    this.showAccountForm = false; // Hesap formunu kapat
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
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
