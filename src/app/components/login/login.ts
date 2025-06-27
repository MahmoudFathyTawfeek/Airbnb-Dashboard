import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Iuser } from '../../models/iuser';
import { userService } from '../../service/user-service';


@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

 userService = inject(userService)  // انجكشن بطريقة تانى بدل ما اعمل كونستراكتور واعمل بريفيت للسيرفيس

  userProp:Iuser = {} as Iuser
  userform:FormGroup

  constructor(){
    this.userform = new FormGroup({
      fname: new FormControl('',[Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    })
  }

  addUser(){
    this.userService.addNewUser(this.userform.value).subscribe((data)=>{
      console.log(data)
    })
  }
}
