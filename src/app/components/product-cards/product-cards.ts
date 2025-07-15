import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Iunit } from '../../models/iunit';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './product-cards.html',
  styleUrls: ['./product-cards.css']
})
export class UnitsComponent implements OnInit {
  http = inject(HttpClient);
  units: Iunit[] = [];

  paginatedUnits: Iunit[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<Iunit[]>('http://localhost:3000/units').subscribe((data) => {
      this.units = data;
      this.totalPages = Math.ceil(this.units.length / this.itemsPerPage);
      this.getPaginatedUnits();
      this.cdr.detectChanges();
    });
  }

  getPaginatedUnits() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUnits = this.units.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedUnits();
    }
  }

  deleteunit(id: number) {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      this.http.delete(`http://localhost:3000/units/${id}`).subscribe(() => {
        this.units = this.units.filter(unit => unit.id !== id);
        this.totalPages = Math.ceil(this.units.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;
        this.getPaginatedUnits();
        this.cdr.detectChanges();
        alert('تم حذف الإعلان');
      }, error => {
        alert('فشل في الحذف');
        console.error(error);
      });
    }
  }
}
