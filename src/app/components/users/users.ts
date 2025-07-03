import { Component, OnInit, inject } from '@angular/core';
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

  ngOnInit(): void {
    this.http.get<Iuser[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
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
