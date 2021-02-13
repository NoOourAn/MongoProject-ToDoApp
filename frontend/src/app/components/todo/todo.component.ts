import { Component, Input, OnInit } from '@angular/core';
import { faTrash,faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('todoInfo') todo;

  fat = faTrash
  fata = faTrashAlt


}
