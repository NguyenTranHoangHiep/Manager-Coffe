import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../service/bill.service'; // Ensure the correct path to your service

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.scss']
})
export class HoadonComponent implements OnInit {
  bills: any[] = [];
  douongList: any[] = []; // Declare douongList variable
  billId: string = '';
  currentBill: any;
  constructor(private router: Router, private billService: BillService) {}

  ngOnInit(): void {
    // Fetch data on component initialization
    this.fetchData();
  }

  fetchData(): void {
    // Fetch drinks and bills data
    this.billService.getDouong().subscribe((douongData: any) => {
      this.douongList = douongData;
      this.getBills(); // Fetch bills after getting drinks
    });
  }

  getBills(): void {
    // Fetch bills
    this.billService.getBills().subscribe(
      (billData: any) => {
        this.bills = billData;
        this.calculateBillDetails(); // Calculate additional details after fetching bills
      },
      (error) => {
        console.error('Error fetching bills:', error);
      }
    );
  }

  calculateBillDetails(): void {
    // Calculate total amount and profit for each bill
    this.bills.forEach(bill => {
      bill.totalAmount = this.calculateTotalAmount(bill.items);
      bill.profit = this.calculateProfit(bill.items);
    });
  }

  openPopup(): void {
    // Example method to navigate to a popup route
    this.router.navigate(['/popup']);
  }

  viewDetails(bill: any): void {
    // Handle viewing details of a bill
    console.log('View details of bill: ', bill);
    // Implement actions such as opening a dialog or navigating to a detail page
  }

  calculateTotalAmount(items: any[]): number {
    // Calculate total amount based on items in a bill
    let total = 0;
    items.forEach(item => {
      total += item.quantity * item.price_per_unit;
    });
    return total;
  }

  calculateProfit(items: any[]): number {
    // Calculate profit based on items in a bill
    let totalAmount = 0;
    let totalCost = 0;
    items.forEach(item => {
      const drink = this.douongList.find(d => d.tenDoUong === item.name);
      if (drink) {
        totalAmount += item.quantity * item.price_per_unit;
        totalCost += item.quantity * drink.Gia;
      } else {
        totalAmount += item.quantity * item.price_per_unit;
        totalCost += item.quantity * item.price_per_unit; // Handle case where drink is not found in douongList
      }
    });
    return totalAmount - totalCost;
  }

  calculateTotalCost(items: any[]): number {
    // Calculate total cost based on items in a bill
    let totalCost = 0;
    items.forEach(item => {
      const drink = this.douongList.find(d => d.tenDoUong === item.name);
      if (drink) {
        totalCost += item.quantity * drink.Gia;
      } else {
        totalCost += item.quantity * item.price_per_unit; // Handle case where drink is not found in douongList
      }
    });
    return totalCost;
  }

  onDeleteBill(id: string): void {
    // Delete a bill and refresh bills data
    if (confirm(`Bạn có muốn xóa bill này`)) {
      this.billService.deleteBill(id).subscribe(
        () => {
          alert(`Xóa bill thành công`);
          this.getBills(); // Refresh bills after deletion
        },
        (error) => {
          console.error(`Lỗi khi xóa bill`, error);
        }
      );
    }
  }
  getBillById() {
    this.billService.getBillById(this.billId).subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.bills = response.map(bill => ({
            ...bill,
            totalAmount: this.calculateTotalAmount(bill.items)
          }));
        } else {
          console.error('Dữ liệu hóa đơn không hợp lệ:', response);
        }
      },
      (error) => {
        console.error('Lỗi khi tìm hóa đơn:', error);
      }
    );
  }
}
