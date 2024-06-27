import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.scss']
})
export class DangnhapComponent {
  public username: string = '';
  public password: string = '';
  public message: string = '';
  public vaiTro: string ='';
  constructor(private userService: UserService, private router: Router) { }

  onLogin(): void {
    this.userService.verifyLogin(this.username, this.password, this.vaiTro).subscribe(isValid => {
      if (isValid) {
        console.log('Đăng nhập thành công');
        this.message = '';
        if (this.vaiTro === 'Admin') {
          this.router.navigate(['/trangchu']); 
        } else if (this.vaiTro === 'Nhân viên') {
          this.router.navigate(['/trangchu1']); 
        } else {
          // Handle other roles if needed
          this.message = 'Vai trò không hợp lệ';
        }
      } else {
        this.message = 'Nhập sai tài khoản và mật khẩu';
      }
    }, error => {
      console.error('Error logging in', error);
      this.message = 'Lỗi khi đăng nhập vui lòng thử lại vào lần khác';
    });
  }
}
