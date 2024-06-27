import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
import { FormsModule, NgModel } from '@angular/forms';
import { BanComponent } from './ban/ban.component';
import { TableService } from './service/table.service';
import { DrinkComponent } from './drink/drink.component';
import { ThongtinTKComponent } from './thongtin-tk/thongtin-tk.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { MatDialog } from '@angular/material/dialog';
import { ThongkeComponent } from './thongke/thongke.component';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { Trangchu1Component } from './trangchu1/trangchu1.component';
@NgModule({
  declarations: [
    AppComponent,
    DangkyComponent,
    DangnhapComponent,
    TrangchuComponent,
    BanComponent,
    DrinkComponent,
    ThongtinTKComponent,
    HoadonComponent,
    ThongkeComponent,
    TaikhoanComponent,
    Trangchu1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
