import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private myClient:HttpClient, private router: Router) { }

  private baseUrl:string;
  addUser(user){
    this.baseUrl = "http://localhost:3000/api/users/register"
    return this.myClient.post(this.baseUrl,user);  ///it returns obsevable i need to subscribe on it to get the response
  }
  signInUser(user){
    this.baseUrl = "http://localhost:3000/api/users/login"
    return this.myClient.post(this.baseUrl,user)  ///it returns observable i need to subscribe on it
  }
  logoutUser(){
    localStorage.clear()
    this.router.navigate(['./login'])
  }
  
}
