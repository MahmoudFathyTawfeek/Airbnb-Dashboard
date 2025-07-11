import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ilisting } from '../../models/ilisting';

@Component({
  selector: 'app-update-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './listings-update.html',
  styleUrls: ['./listings-update.css']
})
export class UpdateListingComponent implements OnInit {
  listingForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.listingForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      unitId: new FormControl(0, [Validators.required]),
      pricePerNight: new FormControl(0, [Validators.required, Validators.min(1)]),
      status: new FormControl('active', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl('')
    });

    this.loadListing();
  }

  loadListing() {
    this.http.get<Ilisting>(`http://localhost:3000/listings/${this.id}`).subscribe({
      next: (listing) => {
        this.listingForm.patchValue(listing);
      },
      error: (err) => {
        console.error(err);
        alert('فشل في تحميل البيانات');
      }
    });
  }

  updateListing() {
    if (this.listingForm.valid) {
      const updated = {
        ...this.listingForm.value,
        id: this.id,
        updatedAt: new Date().toISOString()
      };

      this.http.put(`http://localhost:3000/listings/${this.id}`, updated).subscribe({
        next: () => {
          alert('تم تعديل الإعلان بنجاح');
          this.router.navigate(['/listings']);
        },
        error: (err) => {
          console.error(err);
          alert('فشل في تعديل الإعلان');
        }
      });
    } else {
      alert('من فضلك املأ الحقول بشكل صحيح');
    }
  }
}
