import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestoService } from '../services/resto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted:boolean = false;
  islogedIn:boolean=true;
  alertmsg:string="";
  alert:boolean=false;

  constructor(
    private resto: RestoService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.email, Validators.required]) ,
      password: new FormControl('',[ Validators.required, Validators.minLength(8)])
    });
  }

  get userName(){return this.loginForm.get('username')}
  get passWord(){return this.loginForm.get('password')}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.resto.login(this.loginForm.value).subscribe((data:any)=>{
      this.alertmsg=data.success;
      console.log(data);
      console.log(data.success);
      localStorage.setItem('token',data.token)
      this.alert=true;
      this.router.navigate(['/list'])
    },(error)=>{
      console.log(error);
      // this.alert=true;
    })
  }
}
