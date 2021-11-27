import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { base_url } from 'src/environments/environment';

import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class RestoService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  base_url = 'http://localhost:8200';
  base_urlRegister = 'http://localhost:8200';

  constructor(private http: HttpClient) {
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

 

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }







  //this is for list and register page

  //get all data list in api
  getList() {
    return this.http.get(this.base_url+"/getResto");
  }


  //add a json object like one form inputs
  seveResto(data: any) {
    console.log(data);
    return this.http.post(this.base_url+"/insetResto", data);
  }

  //delete one object from json
  deleteResto(id: number) {
    return this.http.delete(`${this.base_url}/deleteDataById/${id}`);
  }

  //get json object wieth the help of id
  getCurrentRoutes(id: number) {
    return this.http.get<any>(`${this.base_url}/getResto/${id}`);
  }

  //update changes in json object
  updateResto(id: number, data: any) {
    return this.http.put(`${this.base_url}/updateById/${id}`, data);
  }

  //new json object post method for login but its not work bcz of there is no
  // backend server that gives tokens tokens for authentication

  //but now i create my own backend with JWT authentication
  registerUser(data: any) {
    console.log(data);
    return this.http.post(this.base_url + '/register', data);
  }
  login(data:any) {
    return this.http.post(this.base_url+'/login',data);
  }
}
