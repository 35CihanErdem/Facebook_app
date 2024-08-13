import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; 
import { Router } from '@angular/router';
import { BtnComponent } from '../../forms/btn/btn.component'; 
import { InputComponent } from '../../forms/input/input.component'; 

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BtnComponent, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  
}
