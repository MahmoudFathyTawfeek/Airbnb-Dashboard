import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { IauthUser } from '../../models/iauth-user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  userProp: IauthUser = {} as IauthUser;

  constructor(private router: Router) {}

 addUser() {
  if (!this.userProp.email || !this.userProp.password) {
    alert('من فضلك أدخل البريد الإلكتروني وكلمة المرور');
    return;
  }

  const adminData = {
    name: this.userProp.name,
    email: this.userProp.email,
    password: this.userProp.password
  };

  sessionStorage.setItem('admin', JSON.stringify(adminData));

  alert('تم إنشاء الحساب بنجاح');

  this.router.navigate(['/login']);
}

}
