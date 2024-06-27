import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { BanComponent } from './ban/ban.component';
import { DrinkComponent } from './drink/drink.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { ThongkeComponent } from './thongke/thongke.component';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { Trangchu1Component } from './trangchu1/trangchu1.component';

const routes: Routes = [
  { path: 'dangky', component: DangkyComponent },
  { path: 'dangnhap', component: DangnhapComponent },
  {
    path: 'trangchu',
    component: TrangchuComponent,
    children: [
      {path:'taikhoan',component:TaikhoanComponent},
      {path:'drink',component:DrinkComponent},
      {path:'hoadon',component:HoadonComponent},
      {path:'thongke',component:ThongkeComponent},
      { path: '', redirectTo: 'trangchu', pathMatch: 'full' } // Redirect to 'ban' by default under 'trangchu'
    ]
  },
  {
    path: 'trangchu1',
    component: Trangchu1Component,
    children: [
      { path: 'ban', component: BanComponent },
      { path: '', redirectTo: 'trangchu1', pathMatch: 'full' } // Redirect to 'ban' by default under 'trangchu'
    ]
  },
  { path: '', redirectTo: '/dangnhap', pathMatch: 'full' },
  {path:'hoadon',component:HoadonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
