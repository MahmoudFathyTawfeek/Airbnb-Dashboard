import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updateuser.html',
  styleUrls: ['./updateuser.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : 0;

    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      isAdmin: new FormControl(false) // checkbox
    });

    this.loadUser();
  }

  loadUser() {
    this.http.get<any>(`${environment.baseUrl}/users/${this.userId}`).subscribe(data => {
      this.userForm.patchValue(data);
    }, error => {
      console.error('❌ فشل تحميل بيانات المستخدم:', error);
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.http.put(`${environment.baseUrl}/users/${this.userId}`, this.userForm.value).subscribe(() => {
        alert('✅ تم تحديث بيانات المستخدم بنجاح');
        this.router.navigate(['/users']);
      }, error => {
        console.error('❌ فشل التحديث:', error);
      });
    }
  }
}
