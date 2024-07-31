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
export class HomeComponent implements OnInit {
  newComment: string = '';
  data = [
    {
      gonderi_kisi: 'John Doe',
      aciklama: 'Beautiful scenery!',
      resim: 'assets/kisi2.jpg',
      ppfoto: 'assets/kisi1.jpg',
      gonderi_tarih: '2024-07-31',
      begeni: 10,
      yorumlar: [
        { kisi: 'Jane Doe', yorum: 'Lovely!', yorum_tarih: '2024-07-30', ppfoto: 'assets/kisi2.jpg' }
      ],
      showComments: false,
      liked: false
    },
    // Diğer gönderiler...
  ];

  constructor(private authService: AuthService, private authdataService: AuthdataService, private http: HttpClient) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/veriler.json').subscribe(response => {
      this.data = response;
    });
  }

  addComment(post: any) {
    if (this.newComment.trim()) {
      post.yorumlar.push({
        ppfoto: 'assets/kisi4.jpg',
        kisi: 'Siz',
        yorum_tarih: new Date().toLocaleDateString(),
        yorum: this.newComment
      });
      this.newComment = '';
    }
  }

  likePost(post: any) {
    if (!post.liked) {
      post.begeni += 1;
      post.liked = true;
    } else {
      post.begeni -= 1;
      post.liked = false;
    }
  }

  toggleComments(item: any) {
    item.showComments = !item.showComments;
  }
}