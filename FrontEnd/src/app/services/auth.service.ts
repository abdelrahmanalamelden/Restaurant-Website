import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData } from '../interfaces/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators'; // Import tap operator for the pipe method
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';

  private loggedInSubject: BehaviorSubject<boolean>;
  loggedIn$: Observable<boolean>; // Declare loggedIn$ here

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Initialize here
    this.loggedIn$ = this.loggedInSubject.asObservable(); // Initialize loggedIn$ here
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('jwt');
  }

  private setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value); // Update the BehaviorSubject with the new login status
  }

  logout(): void {
    this.cookieService.delete('jwt');
    this.setLoggedIn(false); // Set login status to false on logout
    localStorage.clear();
  }

  registerUser(postData: RegisterPostData) {
    const convertedData = {
      userName: postData.fullName,
      userPassword: postData.password,
      userEmail: postData.email,
    };
    return this.http.post(`${this.baseUrl}/users/register`, convertedData);
  }

  getUserDetails(credentials: {
    userEmail: string;
    userPassword: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, credentials, {
      withCredentials: true,
    });
  }

  login(credentials: {
    userEmail: string;
    userPassword: string;
  }): Observable<any> {
    return this.getUserDetails(credentials).pipe(
      tap((response) => {
        if (response.status === 'success') {
          this.setLoggedIn(true); // Set login status to true
        }
      })
    );
  }

  isAdmin(): boolean {
    const token = this.cookieService.get('jwt');
    console.log('token', token);
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token); // Ensure jwtDecode is callable
      return decodedToken.role === 'admin'; // Adjust according to your token structure
    } catch (error) {
      console.error('Token decoding failed:', error);
      return false;
    }
  }
}
