import { Component,OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login/login.component'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { LogoutComponent } from '../components/logout/logout.component';
import { HomeComponent } from '../components/home/home.component'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,CommonModule,FormsModule,LogoutComponent,HomeComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  constructor(private authService: AuthService, private router: Router) {}


  
}
