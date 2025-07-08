import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ibooking } from '../../models/ibooking';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class BookingsComponent implements OnInit {
  bookings: Ibooking[] = [];
  filteredBookings: Ibooking[] = [];
  filterStartDate = '';
  filterEndDate = '';
  filterStatus = '';
  units: { id: string; title: string }[] = [];

  // pagination
  currentPage = 1;
  pageSize = 7;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadUnits();
  }

  loadBookings() {
    this.http.get<Ibooking[]>(`${environment.baseUrl}/bookings`)
      .subscribe(data => {
        this.bookings = data;
        this.filteredBookings = data;
        this.cdr.detectChanges();
      });
  }

  loadUnits() {
    this.http.get<{ id: string; title: string }[]>(`${environment.baseUrl}/units`)
      .subscribe(data => {
        this.units = data;
        this.cdr.detectChanges();
      });
  }

  getUnitTitle(unitId: string): string {
    const unit = this.units.find(u => u.id === unitId);
    return unit ? unit.title : 'Unknown';
  }

  applyFilters() {
    this.filteredBookings = this.bookings.filter(b => {
      const bookingDate = new Date(b.date).getTime();
      const startDate = this.filterStartDate ? new Date(this.filterStartDate).getTime() : null;
      const endDate = this.filterEndDate ? new Date(this.filterEndDate).getTime() : null;

      const matchesDate =
        (!startDate || bookingDate >= startDate) &&
        (!endDate || bookingDate <= endDate);

      const matchesStatus =
        !this.filterStatus || b.status === this.filterStatus;

      return matchesDate && matchesStatus;
    });

    this.currentPage = 1; // ارجع لأول صفحة لما تتغير الفلاتر
  }

  resetFilters() {
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.filterStatus = '';
    this.filteredBookings = this.bookings;
    this.currentPage = 1;
  }

  // pagination helpers
  get paginatedBookings(): Ibooking[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredBookings.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredBookings.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBookings.length / this.pageSize);
  }

}
