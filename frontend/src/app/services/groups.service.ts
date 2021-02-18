import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private myClient:HttpClient) { }
  private baseUrl:string;
  getGroups(){
    this.baseUrl = "http://localhost:3000/api/groups"

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.get(this.baseUrl,header)
  }
  addGroup(group){
    this.baseUrl = "http://localhost:3000/api/groups"

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.post(this.baseUrl,group,header)
  }
  deleteGroup(id){
    this.baseUrl = `http://localhost:3000/api/groups/${id}`

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.delete(this.baseUrl,header)
  }
  
}
