import { Component, inject } from '@angular/core';
import { AddProductService } from '../../service/add-product-service';
import { Iproducts } from '../../models/iproducts';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [RouterModule, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  proServive = inject(AddProductService)
   userform:FormGroup

   Prodpart:Iproducts = {} as Iproducts

 constructor(){
    this.userform = new FormGroup({
        id: new FormControl('',[Validators.required]),
      productName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      productDetails: new FormControl('',[Validators.required,Validators.minLength(3)]),
      productImgURL: new FormControl('',[Validators.required]),
      productQuantity: new FormControl('',[Validators.required]),
      productPrice: new FormControl('',[Validators.required]),
    
      categoryId: new FormControl('',[Validators.required]),
    })
  }

     addProduct(){
    // let u:Iproducts = {
    //   id:10,
    //   productName:"mahmoud",
    //   productImgURL:"mahmoud@gmail.com",
    //   productQuantity:20,
    //   productPrice:300,
    //   categoryId:1,
    //   productDetails:"loram loram"

    // }
  
    this.proServive.addProduct(this.userform.value).subscribe((data)=>{
      console.log(data)
    })
  alert("You add product seccessfully")
  }
}

