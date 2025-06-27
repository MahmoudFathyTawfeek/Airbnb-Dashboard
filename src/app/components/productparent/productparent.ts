import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Iproducts } from '../../models/iproducts';
import { RouterModule } from '@angular/router';
import { ProductCards } from '../product-cards/product-cards';


@Component({
  selector: 'app-productparent',
  imports: [FormsModule, RouterModule, ProductCards],
  templateUrl: './productparent.html',
  styleUrl: './productparent.css'
})
export class Productparent {

   filterByName!:string               // !  mean not null and not undefind

  productsInParent:Iproducts[]=[]   
  
  
  // new empety array to store the products
  addToCardInParent(pro:Iproducts){    
    //  // check if the produt is found in the new array increase the quatity
    let obj = this.productsInParent.find((proInObj) => proInObj.id==pro.id)  
   
    if(obj){
      obj.productQuantity++
      obj.productPrice = pro.productPrice * obj.productQuantity
    }else{                           // else add the product to the array
      this.productsInParent.push({...pro,productQuantity:1})
    }
  }

  deleteRow(item: any) {
    this.productsInParent = this.productsInParent.filter(i => i !== item);
  }
}
