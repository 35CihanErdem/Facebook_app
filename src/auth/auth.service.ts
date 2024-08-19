import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5154/User';
  private registerUrl = `${this.apiUrl}/register`;
  private loginUrl = `${this.apiUrl}/login`;
  private checkUserUrl = `${this.apiUrl}/check`;
  private deleteUrl = `${this.apiUrl}/delete`;
  private updateUrl = `${this.apiUrl}/update`;

  
  constructor(private http: HttpClient, private router: Router) {}


  public isLoggedIn=false;
    
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      map(response => {
        if (response.success) {
          this.isLoggedIn=true;
          return { success: true, user: response.user};
          
        } else {
          return { success: false, message: response.message || 'Login failed' };
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({ success: false, message: error.message || 'An error occurred during login' });
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { username, password }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Register error:', error);
        return of({ success: false, message: error.message || 'An error occurred during registration' });
      })
    );
  }

  checkUser(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any>(this.checkUserUrl, { params }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Check user error:', error);
        return of({ exists: false, message: error.message || 'An error occurred while checking user' });
      })
    );
  }

  delete(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.delete<any>(this.deleteUrl, { params }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Delete user error:', error);
        return of({ success: false, message: error.message || 'An error occurred during deletion' });
      })
    );
  }

  update(username: string, password: string, newPassword: string): Observable<any> {
    return this.http.put<any>(this.updateUrl, { username, password, newPassword }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Update user error:', error);
        return of({ success: false, message: error.message || 'An error occurred during update' });
      })
    );
  }



  logout() {
    this.isLoggedIn=false;
    this.router.navigate(['/login']);
  }
}



