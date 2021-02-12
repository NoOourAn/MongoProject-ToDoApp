import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  res
  todos=[]
  constructor(private todosService:TodosService) { }

  ngOnInit(): void {
    this.todosService.getTodos()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.todos = this.res.todos
        console.log(this.todos)
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }
  

}
