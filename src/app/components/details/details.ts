import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Iproducts } from '../../models/iproducts';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductAPI } from '../../service/product-api';
import { Static } from '../../service/static';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  currentId:number=0
  product:Iproducts|undefined
   allIds!:number[]
   myIndex!:number


   constructor(
    private route:Router, 
    private active:ActivatedRoute, 
    private productStatic:Static,
    private prodByAPI:ProductAPI,
    private cdr:ChangeDetectorRef,
   ){
   
   }

   ngOnInit(): void {
    //  this.currentId=Number (this.active.snapshot.paramMap.get('idFromDB'))
     this.active.paramMap.subscribe((data)=>{
        this.currentId = Number (data.get('idFromDB'))
      
        this.prodByAPI.getProductById(this.currentId).subscribe((data)=>{
          if(data){
            this.product=data
            this.cdr.detectChanges()
          } else {
          this.route.navigate(['**']);
            }
        })
     })
    //  this.allIds=this.productStatic.getAllIds()
    this.prodByAPI.getAllIds().subscribe((data)=>{
      this.allIds=data.map((id)=>Number(id))
    })
   }

     prev(){
this.myIndex=this.allIds.indexOf(this.currentId)
this.route.navigate(['parent/',this.allIds[--this.myIndex]])
}

next(){
this.myIndex=this.allIds.indexOf(this.currentId)
this.route.navigate(['parent/',this.allIds[++this.myIndex]])
}

one(){
this.myIndex=this.allIds.indexOf(1)
this.route.navigate(['parent/',this.allIds[this.myIndex]])
}
two(){
this.myIndex=this.allIds.indexOf(2)
this.route.navigate(['parent/',this.allIds[this.myIndex]])
}   
three(){
this.myIndex=this.allIds.indexOf(3)
this.route.navigate(['parent/',this.allIds[this.myIndex]])
}
}
