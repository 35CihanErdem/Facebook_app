import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component'; 
import { AuthdataService } from '../../auth/authdata.service';
import { AuthService } from '../../auth/auth.service'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BtnComponent } from '../../forms/btn/btn.component'; 
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
  data: any[] = [];

  constructor(private authService: AuthService, private authdataService: AuthdataService, private http: HttpClient) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    // Yerel depolamadan verileri yükle
    this.loadPosts();
  }

  loadPosts() {
    this.http.get<any[]>('assets/veriler.json').subscribe(response => {
      this.data = response.map(post => {
        // Yerel depolamada var mı kontrol et
        const storedPost = localStorage.getItem('post_' + post.gonderi_tarih);
        return storedPost ? JSON.parse(storedPost) : post;
      });
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
      // Veriyi yerel depolamaya kaydet
      localStorage.setItem('post_' + post.gonderi_tarih, JSON.stringify(post));
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
    // Veriyi yerel depolamaya kaydet
    localStorage.setItem('post_' + post.gonderi_tarih, JSON.stringify(post));
  }

  toggleComments(item: any) {
    item.showComments = !item.showComments;
  }
}