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
  getTodosGroupedByDay(){
    this.baseUrl = "http://localhost:3000/api/todos?groupBy=day"

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.get(this.baseUrl,header)
  }
  getTodosGroupedByMonth(){
    this.baseUrl = "http://localhost:3000/api/todos?groupBy=month"

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.get(this.baseUrl,header)
  }
  getTodosGroupedByGroup(){
    this.baseUrl = "http://localhost:3000/api/todos?groupBy=group"

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.get(this.baseUrl,header)
  }
  changeTodoStatus(id){
    this.baseUrl = `http://localhost:3000/api/todos/status/${id}`
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.patch(this.baseUrl,header)
  }
  deleteTodo(id){
    this.baseUrl = `http://localhost:3000/api/todos/${id}`
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.delete(this.baseUrl,header)
  }
  createTodo(todo){
    this.baseUrl = "http://localhost:3000/api/todos"
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.post(this.baseUrl,todo,header)
  }
  editTodo(todo,todoId){
    this.baseUrl = `http://localhost:3000/api/todos/${todoId}`
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return this.myClient.patch(this.baseUrl,todo,header)
  }

}
