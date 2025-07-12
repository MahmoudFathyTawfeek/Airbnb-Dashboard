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
    // نتحقق إن البيانات كاملة
    if (!this.userProp.email || !this.userProp.password) {
      alert('من فضلك أدخل البريد الإلكتروني وكلمة المرور');
      return;
    }

    // نحفظ بيانات المستخدم في localStorage
    const adminData = {
      email: this.userProp.email,
      password: this.userProp.password
    };

    localStorage.setItem('admin', JSON.stringify(adminData));

    alert('تم إنشاء الحساب بنجاح ✅');

    // نوجهه إلى صفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }
}
