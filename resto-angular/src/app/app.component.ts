import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from './services/resto.service';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resturant-proj';

  currentUser: User | undefined;

  constructor(
      private router: Router,
      private resto: RestoService
  ) {
  }


}
