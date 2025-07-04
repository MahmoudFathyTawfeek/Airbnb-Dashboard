import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Ilisting } from '../../models/ilisting';

@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './listings-form.html',
  styleUrls: ['./listings-form.css']
})
export class AddListingComponent {
  listingForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.listingForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      unitId: new FormControl(0, [Validators.required]),
      pricePerNight: new FormControl(0, [Validators.required, Validators.min(1)]),
      status: new FormControl('active', Validators.required),
      image: new FormControl('', Validators.required),
      createdAt: new FormControl(new Date().toISOString()),
      updatedAt: new FormControl(new Date().toISOString())
    });
  }

  addListing() {
    if (this.listingForm.valid) {
      this.http.post<Ilisting>(`${environment.baseUrl}/listings`, this.listingForm.value).subscribe(() => {
        alert('تمت إضافة الإعلان بنجاح');
        this.router.navigate(['/listings']);
      });
    } else {
      alert('من فضلك املأ الحقول بشكل صحيح');
    }
  }
}
