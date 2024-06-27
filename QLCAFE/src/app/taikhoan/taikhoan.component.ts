import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.scss']
})
export class TaikhoanComponent implements OnInit {
  taiKhoans: any[] = [];
  selectedTaiKhoan: any = null; // Khai báo biến selectedTaiKhoan

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getTaiKhoan();
  }

  getTaiKhoan(): void {
    this.userService.getTaiKhoan().subscribe(
      (data) => {
        this.taiKhoans = data;
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
      }
    );
  }

  deleteTaiKhoan(id: string): void {
    this.userService.deleteTaiKhoan(id).subscribe(
      () => {
        this.taiKhoans = this.taiKhoans.filter(taiKhoan => taiKhoan.id !== id);
        console.log('Xóa tài khoản thành công');
      },
      (error) => {
        console.error('Lỗi khi xóa tài khoản:', error);
      }
    );
  }

  editTaiKhoan(taiKhoan: any): void {
    this.selectedTaiKhoan = { ...taiKhoan }; 
  }

  updateTaiKhoan(): void {
    if (this.selectedTaiKhoan) {
      this.userService.updateTaiKhoan(this.selectedTaiKhoan.id, this.selectedTaiKhoan).subscribe(
        (updatedTaiKhoan) => {
          const index = this.taiKhoans.findIndex(taiKhoan => taiKhoan.id === updatedTaiKhoan.id);
          if (index !== -1) {
            this.taiKhoans[index] = updatedTaiKhoan;
          }
          this.selectedTaiKhoan = null;
          console.log('Cập nhật tài khoản thành công');
        },
        (error) => {
          console.error('Lỗi khi cập nhật tài khoản:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.selectedTaiKhoan = null;
  }
}
