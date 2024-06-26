import { Component, OnInit } from '@angular/core';
import { BillService } from '../service/bill.service';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss']
})
export class ThongkeComponent implements OnInit {
  topSellingItems: any[] = []; // Khai báo mảng để lưu danh sách mặt hàng bán chạy nhất

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getTopSellingItems(3).subscribe(items => {
      this.topSellingItems = items;
    });
  }
}
