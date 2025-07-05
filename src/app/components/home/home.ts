import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  usersCount = 0;
  unitsCount = 0;
  bookingsCount = 0;
  occupancyRate = 0; // نسبة الإشغال الجديدة

  constructor(
    private http: HttpClient,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {
    let usersLoaded = false;
    let unitsLoaded = false;
    let bookingsLoaded = false;

    this.http.get<any[]>(`${environment.baseUrl}/users`).subscribe(data => {
      this.usersCount = data.length;
      usersLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded);
      this.cdr.detectChanges()
    });

    this.http.get<any[]>(`${environment.baseUrl}/units`).subscribe(data => {
      this.unitsCount = data.length;
      unitsLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded);
      this.cdr.detectChanges()
    });

    this.http.get<any[]>(`${environment.baseUrl}/bookings`).subscribe(data => {
      this.bookingsCount = data.length;
      bookingsLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded);
      this.cdr.detectChanges()
    });
  }

  tryUpdateCharts(usersLoaded: boolean, unitsLoaded: boolean, bookingsLoaded: boolean) {
    if (usersLoaded && unitsLoaded && bookingsLoaded) {
      this.updateCharts();
    }
  }


  updateCharts() {
    const values = [this.usersCount, this.unitsCount, this.bookingsCount];
    this.barChartData.datasets[0].data = values;
    this.pieChartData.datasets[0].data = values;

    // حساب نسبة الإشغال
    this.occupancyRate = this.unitsCount > 0
      ? Math.round((this.bookingsCount / this.unitsCount) * 100)
      : 0;
  }

  // Bar Chart
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['مستخدمين', 'وحدات', 'حجوزات'],
    datasets: [{
      data: [0, 0, 0],
      label: 'عدد',
      backgroundColor: ['#0d6efd', '#198754', '#ffc107'],
      borderRadius: 8
    }]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'إحصائيات إجمالية' }
    }
  };

  // Pie Chart
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['مستخدمين', 'وحدات', 'حجوزات'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#0d6efd', '#198754', '#ffc107'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'توزيع النسب' }
    }
  };

  // Line Chart
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      data: [5, 10, 15, 12, 20, 30],
      label: 'المستخدمين الجدد',
      borderColor: '#0dcaf0',
      backgroundColor: 'rgba(13, 202, 240, 0.3)',
      fill: true,
      tension: 0.4
    }]
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'عدد المستخدمين شهريًا' }
    }
  };

  // Doughnut Chart
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['شقق', 'فلل', 'استوديو'],
    datasets: [{
      data: [45, 25, 30],
      backgroundColor: ['#0d6efd', '#6610f2', '#20c997'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'أنواع الوحدات' }
    }
  };
}