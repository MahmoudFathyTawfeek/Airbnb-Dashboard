import { CommonModule } from '@angular/common';
import {  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iproducts } from '../../models/iproducts';
import { Static } from '../../service/static';
import { ProductAPI } from '../../service/product-api';
import { RouterLink, RouterModule } from '@angular/router';



@Component({
  selector: 'app-product-cards',
  imports: [FormsModule, CommonModule,RouterLink,RouterModule],
  templateUrl: './product-cards.html',
  styleUrl: './product-cards.css',
})
export class ProductCards implements OnInit{
  productList!:Iproducts[];
  toggle: boolean = true;
  clientName: string = 'MahmoudFathyMTawfeek';
  totleOrderPrice: number = 0;
  quantity: number = 0;
  userName: string = 'Mahmoud';
  sclientName: boolean = false;
  date: Date = new Date();

  constructor(
   private productStaticService:Static, 
   private productWithAPI:ProductAPI,
   private cdr:ChangeDetectorRef,
  ) {
  //  this.productList = [
  //       {
  //         productId: 1,
  //         productName: 'Apple iPhone 15',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/pnsku/N53432547A/45/_/1694762192/fd45d583-8af9-4ff3-8032-af4a5a3c553c.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 1,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 2,
  //         productName: 'Samsung Galaxy frontend ',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/pnsku/N70030440V/45/_/1702699238/6ae73ece-d29e-4a81-ba41-850055d0937f.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 2,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 3,
  //         productName: 'Apple iPhone 13',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/v1686205682/N50838986A_1.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 0,
  //         productPrice: 200,
  //         categoryId: 1,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 4,
  //         productName: 'Samsung Galaxy ',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/pnsku/N70035206V/45/_/1712239207/3e7c97e2-cf7d-48ee-b324-a5d4aa30efe8.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 1,
  //         productPrice: 200,
  //         categoryId: 2,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 5,
  //         productName: 'OPPO Reno 12F 5G ',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/pnsku/N70093960V/45/_/1721457134/54d5b998-81c6-4fdd-9b0e-eca01f6979b7.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 2,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 6,
  //         productName: 'iphone',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/v1640152217/N52217824A_1.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 2,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 7,
  //         productName: 'iphone',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/pnsku/N70085224V/45/_/1721894952/91270228-e30b-484e-ae2a-3e746b194bb2.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 3,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 8,
  //         productName: 'Reno 11F',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/pnsku/N70063654V/45/_/1713704986/b06f55f9-03d1-4021-8b06-da23bc27e60d.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 1,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       },
  //       {
  //         productId: 9,
  //         productName: 'iphone',
  //         productImgURL:
  //           'https://f.nooncdn.com/p/v1640152217/N52217824A_1.jpg?format=avif&wproductIdth=240',
  //         productQuantity: 20,
  //         productPrice: 200,
  //         categoryId: 1,
  //         productDetails:
  //           'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem  ',
  //       }
  //     ];

      // this.productsAfterSearch=this.productList
      // this.productsAfterSearch=this.productStaticService.getProducts()

       
  }
    ngOnInit(): void {
     
          this.productWithAPI.getAllProducts().subscribe({
        next: (data) => {
          this.productsAfterSearch = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      }); 
    }

  toggleFanc() {
    this.toggle = !this.toggle;
  }

 displayUsername(product: Iproducts) {
  // let obj = this.productList.find((proInObj) => proInObj.productId==product.productId)  
  // if(obj){
        this.sclientName = !this.sclientName;
  }


  // search useing the function in static service
  productsAfterSearch: Iproducts[] = [];

   @Input() set filterByNameInChild(setValue: string) {
    this.productsAfterSearch = this.productStaticService.doSearch(setValue);
    
    this.productsAfterSearch=this.productStaticService.doSearch(setValue)
    // this.productWithAPI.getAllProducts().subscribe((data)=>{
    //   let arrOfData = data.filter((prd)=>{
    //     prd.productName.toLowerCase().includes(setValue)
    //   })
    //   this.productsAfterSearch=arrOfData
    // })
  }

   @Output() prdproperty:EventEmitter<Iproducts>=new EventEmitter<Iproducts>() //create event and create new instance from it and set inituial value
  addToCardInChild(pro:Iproducts){
  // console.log(pro)
  this.prdproperty.emit(pro) // emit the event and fire the data to parent
  }





   buy(qty: string, product: Iproducts) {
      const quant = Number(qty);
      if (quant > 0 && quant <= product.productQuantity) {
        this.totleOrderPrice += quant * product.productPrice;
        product.productQuantity -= quant;
  
      } else {
        alert('Invalid quantity');
      }
    }
}


