import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TodoDetailService } from 'src/app/services/todo-detail.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from 'src/app/services/groups.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit ,OnDestroy,OnChanges{

  subscriber
  todo
  editable = false
  res
  groups = []
  ///errors
  errorMsg
  successMsg
  constructor(private todoDetailService:TodoDetailService,private groupsService:GroupsService,private todosService:TodosService) { }

  ngOnInit(): void {
    this.getTodoDetail();
    this.getAllGroups();
  }

  ///get the todo form to fill
  makeTodoEditable(){
    this.setDefault()
    this.editable = true
  }

  ////edit todo form
  EditTodoForm = new FormGroup({
    title:new FormControl([
      Validators.maxLength(20)
    ]),
    body:new FormControl([
      Validators.maxLength(200)
    ]),
    group:new FormControl()
  })

  ///set the form default with todo details
  setDefault() {
    let todoDetail = {
      title: this.todo.title,
      body: this.todo.body,
      group: this.todo.group,
    };
    this.EditTodoForm.patchValue(todoDetail)
  }

  ///submit the new values
  editTodo(){
    this.todosService.editTodo(this.EditTodoForm.value,this.todo._id)
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.todoDetailService.getTodoDetail(this.todo._id)
        this.successMsg = this.res.message
        this.editable = false
      }
      else{
        this.errorMsg = this.res.message
      }
    },
    (err)=>{
      console.error(err)
    })
  }
  ////cancel the edit
  cancelEdit(){
    this.editable = false
  }

  ngOnChanges(): void {

  }
 
  ngOnDestroy() {
    this.editable = false
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }

  ////some helper functions
  getAllGroups(){
    this.subscriber = this.groupsService.getGroups()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.groups = this.res.groups
        console.log(this.groups)
      }
    },
    (err)=>{
      console.error(err.message)
    })
  }

  getTodoDetail(){
    this.subscriber = this.todoDetailService.TodoDetail
    .subscribe((todo)=>{
      if(todo){
        this.errorMsg = null
        this.successMsg = null
        this.todo = todo
        this.editable = false
        this.groups.forEach(group => {
          if(group._id == this.todo.group)
            this.todo.group = group.title;
        });
      }
    },
    (err)=>{
      console.error(err.message)
    })
  }


}
