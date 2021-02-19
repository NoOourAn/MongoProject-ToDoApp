import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoDetailService } from 'src/app/services/todo-detail.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit,OnDestroy{

  constructor(private todosService:TodosService,private todoDetailService:TodoDetailService) { }

  ngOnInit(): void {
  }

  @Input('todoInfo') todo;

  faTrash = faTrash
  toggleValue = false
  res
  subscriber

  ////event emitter that feels changes on todo component and send signal to todos component to reload 
  @Output() deleteEvent = new EventEmitter<any>(); 

  changeStatus(){
    this.subscriber = this.todosService.changeTodoStatus(this.todo._id)
      .subscribe((response)=>{
        this.res = response
        if(this.res.success){
          this.toggleValue = !this.toggleValue
        }
        else
          console.error(this.res.message)

      },
      (err)=>{
        console.log(err.message);
      })
  }

  deleteTodo(){
    this.subscriber = this.todosService.deleteTodo(this.todo._id)
      .subscribe((response)=>{
        this.res = response
        if(this.res.success){
          console.log(this.res.message)
          // this.deleteEvent.emit(this.res.message)
        }
        else
          console.error(this.res.message)
      },
      (err)=>{
        console.error(err.message)
      })
  }

    

  boom(){
    this.todoDetailService.getTodoDetail(this.todo._id)
    this.deleteEvent.emit("nnn")
  }

  ngOnDestroy() {
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }


}
