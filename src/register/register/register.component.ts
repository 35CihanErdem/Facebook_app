import { Component, ViewEncapsulation } from '@angular/core';
import { BtnComponent } from '../../forms/btn/btn.component';
import { InputComponent } from '../../forms/input/input.component';
import { RouterModule,Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BtnComponent,InputComponent,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Kullanıcı adı ve şifre boş olamaz.');
      return;
    }
  
    if (this.authService.register(this.username, this.password)) {
      alert('Kayıt başarılı. Giriş yapabilirsiniz.');
      this.router.navigate(['/login']);
    } else {
      alert('Kayıt başarısız. Kullanıcı zaten mevcut.');
    }
  }
  onUsernameChange(newUsername: string) {
    this.username = newUsername;
  }

  onPasswordChange(newPassword: string) {
    this.password = newPassword;
  }

  btnregister() {
    this.register();
  }

}
