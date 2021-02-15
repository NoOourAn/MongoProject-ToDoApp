import { Component, OnInit } from '@angular/core';
import { TodoDetailService } from 'src/app/services/todo-detail.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  subscriber
  todo
  constructor(private todoDetailService:TodoDetailService) { }

  ngOnInit(): void {
    this.subscriber = this.todoDetailService.TodoDetail
    .subscribe((todo)=>{
      this.todo = todo
    },
    (err)=>{
      console.error(err.message)
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
