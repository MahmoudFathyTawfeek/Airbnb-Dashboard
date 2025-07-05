import {  ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  constructor(
  private cdr:ChangeDetectorRef
  ){}
 
  ngOnInit(): void {
    this.http.get<Iunit[]>('http://localhost:3000/units').subscribe((data) => {
      this.units = data;
      this.cdr.detectChanges()
       console.log(this.units);
    });
  }
}
