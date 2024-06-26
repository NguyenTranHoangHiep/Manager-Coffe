import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { BanComponent } from './ban/ban.component';
import { DrinkComponent } from './drink/drink.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { PopupComponent } from './popup/popup.component';
import { ThongkeComponent } from './thongke/thongke.component';

const routes: Routes = [
  { path: 'dangky', component: DangkyComponent },
  { path: 'dangnhap', component: DangnhapComponent },
  {
    path: 'trangchu',
    component: TrangchuComponent,
    children: [
      { path: 'ban', component: BanComponent },
      {path:'drink',component:DrinkComponent},
      {path:'hoadon',component:HoadonComponent},
      {path:'thongke',component:ThongkeComponent},
      { path: '', redirectTo: 'trangchu', pathMatch: 'full' } // Redirect to 'ban' by default under 'trangchu'
    ]
  },
  { path: '', redirectTo: '/dangnhap', pathMatch: 'full' },
  { path: 'popup', component: PopupComponent },
  {path:'hoadon',component:HoadonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
