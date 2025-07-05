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
constructor(
   private cdr:ChangeDetectorRef
){}
  ngOnInit(): void {
    this.http.get<Ilisting[]>('http://localhost:3000/listings').subscribe(data => {
      this.listings = data;
      this.cdr.detectChanges()
      console.log(this.listings);
    });
  }

  deleteListing(id: number) {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      this.http.delete(`http://localhost:3000/listings/${id}`).subscribe(() => {
        this.listings = this.listings.filter(listing => listing.id !== id);
        alert('تم حذف الإعلان');
      }, error => {
        alert('فشل في الحذف');
        console.error(error);
      });
    }
  }
}
