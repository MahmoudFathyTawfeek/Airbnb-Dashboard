import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-unit-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class UnitDetailsComponent implements OnInit {
  unitId!: number;
  unit: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

 ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  this.unitId = idParam ? +idParam : 0;
  console.log('🔎 ID من الراوت:', this.unitId); // ✅ تأكيد الـ ID

  this.http.get(`${environment.baseUrl}/units/${this.unitId}`).subscribe(
    data => {
      this.unit = data;
      console.log('📦 بيانات الوحدة:', this.unit); // ✅ تأكيد البيانات
    },
    error => {
      console.error('❌ خطأ في تحميل الوحدة:', error);
    }
  );
}


  goBack() {
    this.router.navigate(['/units']);
  }
}
