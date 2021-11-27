import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestoService } from '../services/resto.service';


@Component({
  selector: 'app-update-resto',
  templateUrl: './update-resto.component.html',
  styleUrls: ['./update-resto.component.css']
})
export class UpdateRestoComponent implements OnInit {
  constructor(private router:ActivatedRoute ,private resto:RestoService) { }

  editResto:any=new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    address: new FormControl('')
  })

  get userName(){return this.editResto.get('name')}
  get emilId(){return this.editResto.get('email')}
  get address(){return this.editResto.get('address')}

  alert:boolean=false;
  userId:number=0;

  ngOnInit(): void {
    this.userId=this.router.snapshot.params.id;
    console.log(this.router.snapshot.params.id);
    this.resto.getCurrentRoutes(this.userId).subscribe((data)=>{
      // console.log(data.name)
      this.editResto=new FormGroup({
        name: new FormControl(data.name),
        email:new FormControl(data.email),
        address: new FormControl(data.address)
      })
    })
  }


  updateCollection(){
    // console.log(this.editResto.value)
    this.resto.updateResto(this.userId,this.editResto.value).subscribe((result)=>{
      console.log("updated")
      this.alert=true;
    })
  }


}
