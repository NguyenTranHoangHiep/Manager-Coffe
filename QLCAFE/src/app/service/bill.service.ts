import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private REST_API_SERVER = 'http://localhost:3000'; // Địa chỉ JSON Server

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}/bills`, this.httpOptions);
  }
}
