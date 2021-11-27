import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../services/resto.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.css'],
})

//hiiiiiiiiiii
export class AddRestoComponent implements OnInit {
  constructor(
    private resto: RestoService,
    private router:Router,
    private route:ActivatedRoute
    ) {}

  id:number;
  isAddMode:boolean;
  addResto:FormGroup;
  imageSrc: string;

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.addResto = new FormGroup({
      name: new FormControl('',[ Validators.required,Validators.minLength(6)]),
      email: new FormControl('',[Validators.email, Validators.required]),
      address: new FormControl('',[ Validators.required,Validators.minLength(6)])
      // file: new FormControl('', [Validators.required]),
    });
    if(!this.isAddMode){
     this.patchForm(this.id);
    }
  }

  patchForm(id:number){
    this.resto.getCurrentRoutes(id).pipe(first()).subscribe(
      x=>{
        console.log(x);
        this.addResto.patchValue({
          name: x[0].name,
          email:x[0].email,
          address:x[0].address,
        })
      } 
    )
  }


  onFileChange(event) {
    // const reader = new FileReader();

    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {

    //     this.imageSrc = reader.result as string;

    //     this.addResto.patchValue({
    //       fileSource: reader.result
    //     });

    //   };

    // }
  }



  get restoName() {
    return this.addResto?.get('name');
  }
  get emilId() {
    return this.addResto?.get('email');
  }
  get address() {
    return this.addResto?.get('address');
  }
  // get file(){
  //   return this.addResto?.get('file');
  // }

  alert: boolean = false;

  collectResto() {
    // console.log(data);

    if(this.isAddMode){
      this.createUser();
    }else{
      this.updateUser();
    }


    // if (this.addResto?.value != {}) {
    //   this.resto.seveResto(this.addResto?.value).subscribe(() => {
    //     console.log('send');
    //     this.alert = true;
    //     this.addResto?.reset({});
    //   });
    // }
  }

  createUser(){
    this.resto.seveResto(this.addResto?.value).subscribe((res) => {
      console.log(res);
      
          console.log('send');
          this.alert = true;
          this.addResto?.reset({});
        },err=>{
          
        });


    // this.http.post('http://localhost:8001/upload.php', this.myForm.value)
    //     .subscribe(res => {
    //       console.log(res);
    //       alert('Uploaded Successfully.');
    //     })
  }

  updateUser(){
    this.resto.updateResto(this.id,this.addResto.value).subscribe((result)=>{
      console.log("updated")
      this.alert=true;
    })
  }

}
