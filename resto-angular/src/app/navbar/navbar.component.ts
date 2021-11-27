import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from '../services/resto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private resto: RestoService,private location:Location) {}

  ngOnInit(): void {}

  logout() {
    this.resto.logout();
    this.router.navigate(['']);
  }
  back() {
    this.location.back();
  }
}
