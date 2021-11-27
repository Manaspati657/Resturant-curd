import { Component, OnInit } from '@angular/core';
import { RestoService } from '../services/resto.service';

@Component({
  selector: 'app-list-resto',
  templateUrl: './list-resto.component.html',
  styleUrls: ['./list-resto.component.css']
})
export class ListRestoComponent implements OnInit {

  constructor(private restoData:RestoService) { }
  collection:any=[]

  ngOnInit(): void {
    this.getResto();
  }

  getResto(){
    this.restoData.getList().subscribe((result)=>{
      this.collection=result
      console.log(result)
    })
  }
  deleteResto(id:number){
    this.restoData.deleteResto(id).subscribe(data=>{
      console.log(data);
      this.getResto();
    })
  }

}
