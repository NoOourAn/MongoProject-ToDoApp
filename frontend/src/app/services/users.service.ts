import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private myClient:HttpClient, private router: Router) { }

  private baseUrl:string = "http://localhost:3000/api/users";
  addUser(user){
    const url = this.baseUrl + "/register"
    return this.myClient.post(url,user);  ///it returns obsevable i need to subscribe on it to get the response
  }
  signInUser(user){
    const url = this.baseUrl + "/login"
    return this.myClient.post(url,user)  ///it returns observable i need to subscribe on it
  }
  logoutUser(){
    localStorage.clear()
    this.router.navigate(['./login'])
  }
  
}
