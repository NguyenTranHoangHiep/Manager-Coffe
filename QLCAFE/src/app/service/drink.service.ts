import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private REST_API_SERVER = 'http://localhost:3000'; // Địa chỉ JSON Server

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Lấy danh sách đồ uống từ API
  getDoUong(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/douong`);
  }

  // Thêm đồ uống mới vào API
  addDoUong(newDoUong: any): Observable<any> {
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/douong`, newDoUong, this.httpOptions);
  }
  searchDrink(tenDoUong: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/douong?tenDoUong=${tenDoUong}`);
  }
  deleteDrink(drinkId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.REST_API_SERVER}/douong/${drinkId}`);
  }
  searchDoUongByTen(tenBan: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/douong?tenDoUong=${tenBan}`);
  }
  editDoUong(drinkId: string, updatedTableData: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/douong/${drinkId}`;
    return this.httpClient.put<any>(url, updatedTableData, this.httpOptions);
  }
}
