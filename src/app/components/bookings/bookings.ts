import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadUnits();
  }

  loadBookings() {
    this.http.get<Ibooking[]>(`${environment.baseUrl}/bookings`)
      .subscribe(data => {
        this.bookings = data;
        this.filteredBookings = data;
      });
  }

  loadUnits() {
    this.http.get<{ id: string; title: string }[]>(`${environment.baseUrl}/units`)
      .subscribe(data => {
        this.units = data;
      });
  }

  getUnitTitle(unitId: string): string {
    const unit = this.units.find(u => u.id === unitId);
    return unit ? unit.id : 'Unknown';
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
  }

  resetFilters() {
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.filterStatus = '';
    this.filteredBookings = this.bookings;
  }
}
