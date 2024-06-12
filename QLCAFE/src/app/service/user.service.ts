import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000'; // Địa chỉ JSON Server

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  public login(): Observable<any> {
    const url = `${this.REST_API_SERVER}/thongtinTk`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public verifyLogin(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Gọi hàm login để kiểm tra thông tin đăng nhập
      this.login().subscribe(
        (response: any) => {
          const userInfo = response;
          // Kiểm tra thông tin đăng nhập
          if (username === userInfo.TK && password === userInfo.MK) {
            // Nếu thông tin đăng nhập đúng, gửi kết quả true
            observer.next(true);
          } else {
            // Nếu thông tin đăng nhập không đúng, gửi kết quả false
            observer.next(false);
          }
          // Kết thúc Observable
          observer.complete();
        },
        (error: any) => {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi đăng nhập:', error);
          // Gửi thông báo lỗi đến observer
          observer.error(error);
          // Kết thúc Observable
          observer.complete();
        }
      );
    });
  }
  public dangKy(thongTinTK: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/thongtinTk`;
    return this.httpClient.post<any>(url, thongTinTK, this.httpOptions);
  } 
}
