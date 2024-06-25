import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000'; // JSON Server address

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  public login(username: string, password: string, vaiTro: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/thongtinTk?TK=${username}&MK=${password}&vaiTro=${vaiTro}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public verifyLogin(username: string, password: string,vaiTro:string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.login(username, password,vaiTro).subscribe(
        (response: any) => {
          const userInfo = response[0]; // Assuming the response is an array with one object
          // Check if username and password match
          if (userInfo && username === userInfo.TK && password === userInfo.MK) {
            observer.next(true); // Send true if login is successful
          } else {
            observer.next(false); // Send false if login fails
          }
          observer.complete(); // Complete the observable
        },
        (error: any) => {
          console.error('Error logging in:', error);
          observer.error(error); // Handle error and pass it along
          observer.complete(); // Complete the observable
        }
      );
    });
  }

  public dangKy(thongTinTK: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/thongtinTk`;
    return this.httpClient.post<any>(url, thongTinTK, this.httpOptions);
  }
}
