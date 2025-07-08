import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {
  http = inject(HttpClient);
  users: Iuser[] = [];

  currentPage = 1;
  pageSize = 7;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<Iuser[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
      this.cdr.detectChanges();
      console.log(this.users);
    });
  }

  get paginatedUsers(): Iuser[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.users.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
get totalPages(): number {
  return Math.ceil(this.users.length / this.pageSize);
}


  deleteUser(id: number) {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
        alert('تم حذف المستخدم');
      }, error => {
        alert('فشل في الحذف');
        console.error(error);
      });
    }
  }
}
