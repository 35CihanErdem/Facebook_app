import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http:HttpClient,private router:Router){}

  private apiUrl='http://localhost:5154/User';

  private registerUrl=`${this.apiUrl}/register`;

  private loginUrl=`${this.apiUrl}/login`;

  private checkUserUrl = `${this.apiUrl}/check`;

  private deleteUrl =`${this.apiUrl}/delete`;

  private uptadeUrl=`${this.apiUrl}/update`;

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`/api/users/${username}`);
  }

  login(username:string,password:any):Observable<any>{
    return this.http.post<any>(this.loginUrl,{username,password}).pipe(
      map(response => {
        if (response.success) {
          return { success: true, user: response.user };
        } else {
          return { success: false, message: response.message || 'Login failed' };
        }
      }),
      catchError(error=>{
        console.error('login error:',error);
        return of ({success:false,message:error.message||'an error occured during login '});
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
    return this.http.put<any>(this.uptadeUrl, { username, password, newPassword }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Update user error:', error);
        return of({ success: false, message: error.message || 'An error occurred during update' });
      })
    );
  }
  
  logout() {

    this.router.navigate(['/login']);
  }




}
