import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailService {

  constructor(private myClient:HttpClient) { }

  ////variables
  baseUrl
  res

  private todo = new Subject<object>();
  ///this is what we will subscribe on...
  TodoDetail = this.todo.asObservable();

  getTodoDetail(todoid){
    this.baseUrl = `http://localhost:3000/api/todos/${todoid}`
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    this.myClient.get(this.baseUrl,header)
    .subscribe((response)=>{
      this.res=response
      if(this.res.success)
        this.todo.next(this.res.todo)
    },
    (err)=>{
      console.error(err.message)
    })
  }

}
