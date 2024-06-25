import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../service/bill.service';

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.scss']
})
export class HoadonComponent implements OnInit {
  bills: any[] = [];

  constructor(private router: Router, private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getBills().subscribe((data: any) => {
      this.bills = data;
    });
  }

  openPopup(): void {
    this.router.navigate(['/popup']);
  }
  viewDetails(bill: any): void {
    // Xử lý khi người dùng xem chi tiết hóa đơn
    console.log('View details of bill: ', bill);
    // Thực hiện các thao tác cần thiết, ví dụ mở dialog, route tới trang chi tiết, ...
  }
  calculateTotalAmount(items: any[]): number {
    let total = 0;
    items.forEach(item => {
      total += item.quantity * item.price_per_unit;
    });
    return total;
  }
}
