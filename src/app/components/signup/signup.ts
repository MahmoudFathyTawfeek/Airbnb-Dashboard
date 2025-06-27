import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iuser } from '../../models/iuser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userService } from '../../service/user-service';


@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule, CommonModule,],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  
  userSer = inject(userService)  // انجكشن بطريقة تانى بدل ما اعمل كونستراكتور واعمل بريفيت للسيرفيس

  userProp:Iuser = {} as Iuser

  addUser(){
    // let u:Iuser = {
    //   fname:"mahmoud",
    //   email:"mahmoud@gmail.com",
    //   password:"mahmoud123"
    // }
    this.userSer.addNewUser(this.userProp).subscribe((data)=>{
      console.log(data)
    })

  }
}
