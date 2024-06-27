import { Component, OnInit } from '@angular/core';
import { BillService } from '../service/bill.service';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss']
})
export class ThongkeComponent implements OnInit {
  topSellingItems: any[] = [];
  totalProfit: number = 0;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getTopSellingItems(5).subscribe(items => {
      this.topSellingItems = items;
    });
  }
}
