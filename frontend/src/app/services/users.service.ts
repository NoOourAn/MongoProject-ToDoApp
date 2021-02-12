import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private myClient:HttpClient) { }

  private baseUrl:string = "http://localhost:3000/api/users/register"
  addUser(user){
    return this.myClient.post(this.baseUrl,user);
  }
}
