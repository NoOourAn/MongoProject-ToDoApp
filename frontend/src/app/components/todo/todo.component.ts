import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { TodoDetailService } from 'src/app/services/todo-detail.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit,OnChanges,OnDestroy{

  constructor(private todosService:TodosService,private todoDetailService:TodoDetailService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.todo.status)
      this.toggleValue = true
    else
      this.toggleValue = false
  }

  @Input('todoInfo') todo;

  faTrash = faTrash
  faEdit = faEdit
  toggleValue = false
  res
  subscriber

  ////event emitter that feels changes on todo component and send signal to todos component to reload 
  @Output() feelChangesEvent = new EventEmitter<any>(); 

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
          this.feelChangesEvent.emit()   ///to update the parent (todos component)
          this.todoDetailService.clearTodoDetail()  ///to update the sibling (todo-detail component)
        }
        else
          console.error(this.res.message)
      },
      (err)=>{
        console.error(err.message)
      })
  }

    

  showTodoDetail(){
    this.todoDetailService.getTodoDetail(this.todo._id) ///to update the sibling (todo-detail component)
  }

  ngOnDestroy() {
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }


}
