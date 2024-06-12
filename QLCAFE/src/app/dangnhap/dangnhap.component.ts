import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.scss']
})
export class DangnhapComponent {
  TK: string = '';
  MK: string = '';
  message:  string='';
  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.TK || !this.MK) {
      this.message = 'Tên tài khoản và mật khẩu không được để trống.';
      return;
    }

    this.userService.verifyLogin(this.TK, this.MK).subscribe(
      (loggedIn: boolean) => {
        if (loggedIn) {
          // Đăng nhập thành công, chuyển hướng đến trang danh sách cổ phiếu
          this.router.navigate(['/trangchu']);
        } else {
          // Đăng nhập không thành công, hiển thị thông báo lỗi
          this.message = 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.';
        }
      },
      (error: any) => {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi đăng nhập:', error);
        this.message = 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.';
      }
    );
  }
}
