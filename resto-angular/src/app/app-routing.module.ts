import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestoComponent } from './add-resto/add-resto.component';
import { ListRestoComponent } from './list-resto/list-resto.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from './services/auth/login.guard';
// import { UpdateRestoComponent } from './update-resto/update-resto.component';

const routes: Routes = [
  // {path:'list/add',component:AddRestoComponent},
  // {path:'list/add/list/add',component:AddRestoComponent},
  // {path:'list',component:ListRestoComponent},
  // {path:'list/add/list',component:ListRestoComponent},
  // {path:'register',component:RegisterComponent},
  // {path:'update/:id',component:AddRestoComponent},
  // {path:'',component:LoginComponent}

  {path:"",
    children:[
      {path:'',component:LoginComponent},
      {path:'list',component:ListRestoComponent,canActivate:[LoginGuard]},
      {path:'update/:id',component:AddRestoComponent,canActivate:[LoginGuard]},
      {path:'add',component:AddRestoComponent,canActivate:[LoginGuard]},
      {path:'register',component:RegisterComponent},
      {path:'**',component:PageNotFoundComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
