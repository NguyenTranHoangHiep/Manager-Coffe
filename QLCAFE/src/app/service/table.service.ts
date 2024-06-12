import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private REST_API_SERVER = 'http://localhost:3000'; // Địa chỉ JSON Server

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  // Phương thức để lấy danh sách bàn từ JSON Server
  getTables(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/ban`);
  }
  addTable(newTable: any): Observable<any> {
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/ban`, newTable, this.httpOptions);
  }
  deleteTable(tableId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.REST_API_SERVER}/ban/${tableId}`);
  }
  searchTableBySoban(soban: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/ban?soban=${soban}`);
  }
  editTable(tableId: string, updatedTableData: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/ban/${tableId}`;
    return this.httpClient.put<any>(url, updatedTableData, this.httpOptions);
}
}
