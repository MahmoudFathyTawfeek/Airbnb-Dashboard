import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit {

  usersCount = 0;
  unitsCount = 0;
  bookingsCount = 0;
  adsCount = 0;
  occupancyRate = 0;

  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateAllCharts();
    }, 0);
  }

  loadCounts() {
    let usersLoaded = false;
    let unitsLoaded = false;
    let bookingsLoaded = false;
    let listingsLoaded = false;

    this.http.get<any[]>(`${environment.baseUrl}/users`).subscribe(data => {
      this.usersCount = data.length;
      usersLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded, listingsLoaded);
      this.cdr.detectChanges();
    });

    this.http.get<any[]>(`${environment.baseUrl}/units`).subscribe(data => {
      this.unitsCount = data.length;
      unitsLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded, listingsLoaded);
      this.cdr.detectChanges();
    });

    this.http.get<any[]>(`${environment.baseUrl}/bookings`).subscribe(data => {
      this.bookingsCount = data.length;
      bookingsLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded, listingsLoaded);
      this.cdr.detectChanges();
    });

    this.http.get<any[]>(`${environment.baseUrl}/listings`).subscribe(data => {
      this.adsCount = data.length;
      listingsLoaded = true;
      this.tryUpdateCharts(usersLoaded, unitsLoaded, bookingsLoaded, listingsLoaded);
      this.cdr.detectChanges();
    });
  }

  tryUpdateCharts(usersLoaded: boolean, unitsLoaded: boolean, bookingsLoaded: boolean, listingsLoaded: boolean) {
    if (usersLoaded && unitsLoaded && bookingsLoaded && listingsLoaded) {
      this.updateCharts();
      this.updateAllCharts();
    }
  }

  updateCharts() {
    const values = [this.usersCount, this.unitsCount, this.bookingsCount, this.adsCount];
    this.barChartData.datasets[0].data = values;
    this.pieChartData.datasets[0].data = values;

    this.occupancyRate = this.unitsCount > 0
      ? Math.round((this.bookingsCount / this.unitsCount) * 100)
      : 0;
  }

  updateAllCharts() {
    this.charts?.forEach(chart => chart.update());
  }

  // Bar Chart
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['مستخدمين', 'وحدات', 'حجوزات', 'إعلانات'],
    datasets: [{
      data: [0, 0, 0, 0],
      label: 'عدد',
      backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
      borderRadius: 8
    }]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'إحصائيات إجمالية' }
    }
  };

  // Pie Chart
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['مستخدمين', 'وحدات', 'حجوزات', 'إعلانات'],
    datasets: [{
      label: 'النسب',
      data: [0, 0, 0, 0],
      backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
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
    maintainAspectRatio: false,
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
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'أنواع الوحدات' }
    }
  };
}
