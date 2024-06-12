import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinTKComponent } from './thongtin-tk.component';

describe('ThongtinTKComponent', () => {
  let component: ThongtinTKComponent;
  let fixture: ComponentFixture<ThongtinTKComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongtinTKComponent]
    });
    fixture = TestBed.createComponent(ThongtinTKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
