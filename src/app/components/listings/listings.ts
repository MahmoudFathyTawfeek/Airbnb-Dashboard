import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ilisting } from '../../models/ilisting';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './listings.html',
  styleUrls: ['./listings.css']
})
export class ListingsComponent implements OnInit {
  http = inject(HttpClient);
  listings: Ilisting[] = [];
  paginatedListings: Ilisting[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<Ilisting[]>('http://localhost:3000/listings').subscribe(data => {
      this.listings = data;
      this.totalPages = Math.ceil(this.listings.length / this.itemsPerPage);
      this.getPaginatedListings();
      this.cdr.detectChanges();
      console.log(this.listings);
    });
  }

  getPaginatedListings() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedListings = this.listings.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginatedListings();
    }
  }

  deleteListing(id: number) {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      this.http.delete(`http://localhost:3000/listings/${id}`).subscribe(() => {
        this.listings = this.listings.filter(listing => listing.id !== id);
        this.totalPages = Math.ceil(this.listings.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
        this.getPaginatedListings();
        alert('تم حذف الإعلان');
      }, error => {
        alert('فشل في الحذف');
        console.error(error);
      });
    }
  }
}
