import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestoService } from '../services/resto.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alertmsg:string ="";

  constructor(
    private resto:RestoService,
    private router:Router
    ) { }

  alert:boolean=false;
  registerResto=new FormGroup({
    username: new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  get userName(){return this.registerResto.get('username')}
  get emilId(){return this.registerResto.get('email')}
  get passWord(){return this.registerResto.get('password')}


  ngOnInit(): void {
  }

  userRegistered(){
    this.resto.registerUser(this.registerResto.value).subscribe((data:any)=>{
      this.alertmsg=data.success;
      if(data.register){
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      }
      console.log(data.success);
      this.alert=true;
    },(error)=>{
      this.alertmsg="Something went wrong !!!";
      console.log(error);
      this.alert=true;
    })
    
   

  }

}
