import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service'

@Injectable({
  providedIn: 'root'
})
export class TodoDetailService {

  constructor(private myClient:HttpClient,private helper:HelperService) { }

  ////variables
  private baseUrl:string = "http://localhost:3000/api/todos";
  res

  private todo = new Subject<object>();
  TodoDetail = this.todo.asObservable();

  getTodoDetail(todoid){
    const url = this.baseUrl + `/${todoid}`;
    const header = this.helper.setHeaders()

    this.myClient.get(url,header)
    .subscribe((response)=>{
      this.res=response
      if(this.res.success)
        this.todo.next(this.res.todo)
    },
    (err)=>{
      console.error(err.message)
    })
  }
  clearTodoDetail(){
    this.todo.next()
  }

}
