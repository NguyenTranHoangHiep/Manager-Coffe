import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../service/drink.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  drinks: any[] = [];
  foundDrinks: any[] = [];
  newDrink: any = {};
  showAddForm: boolean = false;
  searchTenDoUong: string = '';
  selectedCategory: string = ''; // Add selectedCategory property
  editMode: boolean = false;
  editedTable: any = {};

  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.getDrinks();
  }

  addDrink(): void {
    if (this.editMode) {
      this.updateDrink();
    } else {
      this.drinkService.addDoUong(this.newDrink).subscribe(() => {
        this.getDrinks();
        this.newDrink = {};
      });
    }
  }

  getDrinks(): void {
    this.drinkService.getDoUong().subscribe((data: any[]) => {
      this.drinks = data;
      this.foundDrinks = data;
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newDrink = {};
      this.editMode = false;
    }
  }

  searchDrink(): void {
    this.foundDrinks = this.drinks.filter(drink => {
      const matchesName = this.searchTenDoUong ? drink.tenDoUong.includes(this.searchTenDoUong) : true;
      const matchesCategory = this.selectedCategory ? drink.loaiDoUong === this.selectedCategory : true;
      return matchesName && matchesCategory;
    });
  }

  deleteDrink(drinkId: string): void {
    this.drinkService.deleteDrink(drinkId).subscribe(
      (response: any) => {
        console.log('Drink deleted successfully:', response);
        this.getDrinks();
      },
      (error: any) => {
        console.error('Error deleting drink:', error);
      }
    );
  }

  setEditedDrink(drink: any): void {
    this.editMode = true;
    this.newDrink = { ...drink };
  }

  updateDrink(): void {
    if (this.newDrink.id) {
      this.drinkService.editDoUong(this.newDrink.id, this.newDrink).subscribe(
        (response: any) => {
          console.log('Drink updated successfully:', response);
          this.getDrinks();
          this.editMode = false; // Tắt biểu mẫu chỉnh sửa sau khi cập nhật thành công
        },
        (error: any) => {
          console.error('Error updating drink:', error);
        }
      );
    } else {
      console.error('Please provide all required information for the drink.');
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.newDrink = {};
    this.showAddForm = false; // Ẩn biểu mẫu chỉnh sửa sau khi hủy
  }
}
