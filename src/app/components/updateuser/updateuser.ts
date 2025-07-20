import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './updateuser.html',
  styleUrls: ['./updateuser.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
   userId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  
   ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ?? '';  

    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      isAdmin: new FormControl(false)
    });

    this.loadUser();
  }

  loadUser() {
    this.http.get<Iuser>(`${environment.baseUrl}/users/${this.userId}`).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: (err) => {
        console.error(err);
        alert('failed to load data');
      }
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.http.put(`${environment.baseUrl}/users/${this.userId}`, this.userForm.value).subscribe(() => {
        alert('User data updated successfully');
        this.router.navigate(['/users']);
      }, error => {
        console.error('Failed to update user', error);
      });
    }
  }
}

