import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HelperService } from './helper.service'

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private myClient:HttpClient,private helper:HelperService) { }
  private baseUrl:string = "http://localhost:3000/api/todos";
  ////////
  getTodos(){
    const header = this.helper.setHeaders()
    return this.myClient.get(this.baseUrl,header)
  }
  /////////
  createTodo(todo){
    const header = this.helper.setHeaders()
    return this.myClient.post(this.baseUrl,todo,header)
  }
  //////////
  getTodosGroupedByDay(){
    const url = this.baseUrl + "?groupBy=day";
    const header = this.helper.setHeaders()
    return this.myClient.get(url,header)
  }
  ////////
  getTodosGroupedByMonth(){
    const url = this.baseUrl + "?groupBy=month";
    const header = this.helper.setHeaders()
    return this.myClient.get(url,header)
  }
  ////////
  getTodosGroupedByGroup(){
    const url = this.baseUrl + "?groupBy=group";
    const header = this.helper.setHeaders()
    return this.myClient.get(url,header)
  }
  ///////
  changeTodoStatus(id){
    const url = this.baseUrl + `/status/${id}`;
    const header = this.helper.setHeaders()
    return this.myClient.patch(url,null,header)
  }
  ////////
  deleteTodo(id){
    const url = this.baseUrl + `/${id}`;
    const header = this.helper.setHeaders()
    return this.myClient.delete(url,header)
  }
  ///////
  editTodo(todo,todoId){
    const url = this.baseUrl + `/${todoId}`;
    const header = this.helper.setHeaders()
    return this.myClient.patch(url,todo,header)
  }

}
