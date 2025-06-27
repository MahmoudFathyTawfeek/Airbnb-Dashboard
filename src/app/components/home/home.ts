import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Store } from '../../models/store';
import { RouterLink, RouterModule } from '@angular/router';
import { Iproducts } from '../../models/iproducts';
import { Authintication } from '../../service/authintication';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

   storePropairty: Store = new Store(
    'Our Branches',
    'dell2.PNG',
       ["cairo","alex","Giza","Sohag"]

  );

  userAuth = inject(Authintication)
  isuserlogpro:boolean=true
constructor(
  private cdr:ChangeDetectorRef
){

  this.isuserlogpro = this.userAuth.userLoged
}

login(){
  this.userAuth.login("mahmoud","1234")
  this.isuserlogpro=this.userAuth.userLoged
}

logout(){
  this.userAuth.logout()
  this.isuserlogpro=this.userAuth.userLoged
}
}
