import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Iuser } from '../../models/iuser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {
  http = inject(HttpClient);
  users: Iuser[] = [];
  filteredUsers: Iuser[] = []; 

  currentPage = 1;
  pageSize = 7;

  searchEmail = '';
  searchError = ''; 

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<Iuser[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.cdr.detectChanges();
    });
  }

  get paginatedUsers(): Iuser[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  deleteUser(id: number | string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
        alert('User deleted successfully');
        this.cdr.detectChanges();
      }, error => {
        alert('Failed to delete user');
        console.error(error);
      });
    }
  }

  searchByEmail() {
    this.searchError = '';
    const email = this.searchEmail.trim().toLowerCase();

    if (!email) {
      this.filteredUsers = this.users;
      this.currentPage = 1;
      return;
    }

    const foundUsers = this.users.filter(user => user.email.toLowerCase() === email);

    if (foundUsers.length > 0) {
      this.filteredUsers = foundUsers;
      this.currentPage = 1;
    } else {
      this.filteredUsers = [];
      this.searchError = 'This user e-mail not found';
    }
  }
}
