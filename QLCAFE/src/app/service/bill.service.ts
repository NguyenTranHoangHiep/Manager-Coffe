import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator correctly

export interface Item {
  item_id: string;
  name: string;
  quantity: number;
  price_per_unit: number;
}

export interface Douong {
  tenDoUong: string;
  Gia: number;
}
@Injectable({
  providedIn: 'root'
})
export class BillService {

  private REST_API_SERVER = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private douongList: Douong[] = [];
  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/bills`, this.httpOptions);
  }

  getDouong(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/douong`, this.httpOptions);
  }

  deleteBill(id: string): Observable<any> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/bills/${id}`, this.httpOptions);
  }

  getBillById(billId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER}/bills?bill_id=${billId}`);
  }

  getTopSellingItems(topCount: number): Observable<any[]> {
    return this.getBills().pipe(
      map(bills => {
        const itemsCount: { [key: string]: number } = {};

        bills.forEach((bill: any) => { // Ensure bill parameter is typed correctly
          bill.items.forEach((item: Item) => {
            const name = item.name;
            itemsCount[name] = (itemsCount[name] || 0) + item.quantity;
          });
        });

        const sortedItems = Object.entries(itemsCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, topCount)
          .map(([name, quantity]) => ({ name, quantity }));

        return sortedItems;
      })
    );
  }
}
