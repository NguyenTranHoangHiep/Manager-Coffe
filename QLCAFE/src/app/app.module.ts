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
@NgModule({
  declarations: [
    AppComponent,
    DangkyComponent,
    DangnhapComponent,
    TrangchuComponent,
    BanComponent,
    DrinkComponent,
    ThongtinTKComponent,
    HoadonComponent
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
