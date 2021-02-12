import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private myClient:HttpClient) { }

  private baseUrl:string;
  getTodos(){
    this.baseUrl = "http://localhost:3000/api/todos"

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    
    return this.myClient.get(this.baseUrl,header)
  }

}
