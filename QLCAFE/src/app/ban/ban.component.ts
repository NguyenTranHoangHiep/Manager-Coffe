import { Component, OnInit } from '@angular/core';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-ban',
  templateUrl: './ban.component.html',
  styleUrls: ['./ban.component.scss']
})
export class BanComponent implements OnInit {
  tables: any[] = [];
  newTable: any = {}; // Đối tượng để lưu thông tin của bàn mới
  showAddForm: boolean = false; // Biến để kiểm soát việc hiển thị biểu mẫu
  searchSoban: string = ''; // Biến để lưu số bàn cần tìm kiếm
  foundTables: any[] = []; // Đối tượng để lưu kết quả tìm kiếm
  editMode: boolean = false; // Biến để kiểm soát việc hiển thị biểu mẫu sửa

  editedTable: any = {}; // Đối tượng để lưu thông tin bàn đang được sửa

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    this.tableService.getTables().subscribe(
      (data: any[]) => {
        this.tables = data;
        this.foundTables = data; // Hiển thị tất cả bàn ban đầu
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  // Phương thức để thêm một bàn mới
  addTable() {
    if (this.newTable.id && this.newTable.soban && this.newTable.khuvuc) {
      this.tableService.addTable(this.newTable).subscribe(
        (response) => {
          console.log('Thêm bàn thành công:', response);
          this.getTableData();
          this.showAddForm = false;
          this.newTable = {};
          alert('Thêm bàn thành công!');
        },
        (error) => {
          console.error('Lỗi khi thêm bàn:', error);
          alert('Lỗi khi thêm bàn, vui lòng thử lại sau.');
        }
      );
    } else {
      // Hiển thị alert yêu cầu cung cấp đầy đủ thông tin cho bàn mới
      alert('Vui lòng cung cấp đầy đủ thông tin cho bàn mới. Các trường cần thiết: ID, Số bàn, Khu vực');
    }
  }
  
  // Phương thức tìm kiếm bàn theo số bàn
  searchTable() {
    if (this.searchSoban) {
      this.tableService.searchTableBySoban(this.searchSoban).subscribe(
        (data: any[]) => {
          this.foundTables = data;
        },
        (error) => {
          console.error('Error searching table:', error);
        }
      );
    } else {
      this.foundTables = this.tables;
    }
  }

  // Phương thức để xóa bàn
  deleteTable(tableId: string) {
    this.tableService.deleteTable(tableId).subscribe(
      (response) => {
        console.log('Table deleted successfully:', response);
        // Sau khi xóa thành công, làm mới danh sách bàn
        this.getTableData();
      },
      (error) => {
        console.error('Error deleting table:', error);
      }
    );
  }

  // Phương thức để thiết lập chế độ sửa và lưu thông tin bàn đang được sửa
  setEditedTable(table: any) {
    this.editMode = true;
    this.editedTable = { ...table };
  }

  // Phương thức để cập nhật thông tin bàn
  updateTable() {
    if (this.editedTable.id && this.editedTable.soban && this.editedTable.khuvuc) {
      this.tableService.editTable(this.editedTable.id, this.editedTable).subscribe(
        (response) => {
          console.log('Table updated successfully:', response);
          // Sau khi chỉnh sửa thành công, làm mới danh sách bàn và kết thúc chế độ sửa
          this.getTableData();
          this.editMode = false;
        },
        (error) => {
          console.error('Error updating table:', error);
        }
      );
    } else {
      console.error('Please provide all required information for the table.');
    }
  }


  // Phương thức để hủy chế độ sửa
  cancelEdit() {
    this.editMode = false;
    this.editedTable = {};
  }
}
