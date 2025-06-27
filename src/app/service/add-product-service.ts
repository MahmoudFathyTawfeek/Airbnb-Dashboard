import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproducts } from '../models/iproducts';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
httpHeaders={}
  constructor(
     private http:HttpClient
  ) {
     this.httpHeaders={headers:new HttpHeaders({
     'Content-Type':'applicatin/json'
    })}
   }

    addProduct(newUser:Iproducts):Observable<Iproducts>{
       return this.http.post<Iproducts>(`${environment.baseUrl}/products`,newUser,this.httpHeaders)
      }
}
