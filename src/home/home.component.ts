import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout/logout.component';

import { AuthdataService } from '../auth/authdata.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BtnComponent } from "../forms/btn/btn.component";  
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoutComponent, BtnComponent,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 
  newComment: any;
  data = [
    {
      gonderi_kisi: 'John Doe',
      aciklama: 'Beautiful scenery!',
      resim: 'assets/kisi2.jpg',
      ppfoto: 'assets/kisi1.jpg',
      gonderi_tarih: '2024-07-31',
      begeni: 10,
      liked: false,
      yorumlar: [
        { kisi: 'Jane Doe', yorum: 'Lovely!', yorum_tarih: '2024-07-30', ppfoto: 'assets/kisi2.jpg' },
        // Diğer yorumlar...
      ],
      showComments: false,
    },
    // Diğer gönderiler...
  ];

  constructor(private authService: AuthService ,private authdataService:AuthdataService,private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/veriler.json').subscribe(response => {
      this.data = response;
    });
  }

  toggleComments(item: any) {
    item.showComments = !item.showComments;
  }

  onLogout() {
    this.authService.logout();  
  }

  addComment(post: {
      yorumlar: {
        ppfoto: string; // Bu sizin kullanıcı fotoğrafınız olabilir
        kisi: string; // Bu sizin kullanıcı adınız olabilir
        yorum_tarih: string; yorum: any;
      }[];
    }) {
    if (this.newComment.trim()) {
      post.yorumlar.push({
        ppfoto: 'assets/kisi4.jpg', // Bu sizin kullanıcı fotoğrafınız olabilir
        kisi: 'Siz', // Bu sizin kullanıcı adınız olabilir
        yorum_tarih: new Date().toLocaleDateString(),
        yorum: this.newComment
      });
      this.newComment = '';
    }
  }

  likePost(post: { liked: boolean; begeni: number; }) {
    if (!post.liked) {
      post.begeni += 1;
      post.liked = true;
    }
  }
  showLogoutMenu = false;

  toggleLogoutMenu() {
    this.showLogoutMenu = !this.showLogoutMenu;
  }
}

