import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Authintication } from '../../service/authintication';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

   logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  }

  userLogedInNav:boolean = false

  constructor(private userAuth:Authintication){
    // this.userLogedInNav=this.userAuth.userLoged
    this.userAuth.userloggedmethod().subscribe((data)=>{
      this.userLogedInNav=data
    })

  }

}
