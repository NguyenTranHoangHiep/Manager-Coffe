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

  constructor(private userService: UserService, private router: Router) { }

  onLogin(): void {
    this.userService.verifyLogin(this.username, this.password).subscribe(isValid => {
      if (isValid) {
        console.log('Đăng nhập thành công');
        this.message = '';
        // Navigate to another page or perform further actions after successful login
        this.router.navigate(['/trangchu']); // Example route
      } else {
        this.message = 'Nhập sai tài khoản và mật khẩu';
      }
    }, error => {
      console.error('Error logging in', error);
      this.message = 'Lỗi khi đăng nhập vui lòng thử lại vào lần khác';
    });
  }
}
