import { Component, OnChanges, OnInit, OnDestroy, Input } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare, faTimes, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit ,OnChanges , OnDestroy{

  res
  faPlusSquare = faPlusSquare
  faTimes = faTimes
  faArrowLeft = faArrowLeft
  todos=[]
  groups=[]
  groupedTodos=[]
  subscriber
  grouped=false
  constructor(private todosService:TodosService,private groupsService:GroupsService,private modalService: NgbModal) { }


  ngOnInit(): void {
    this.updateView()
  }

  ///functions to update todos component according to changes in its children
  updateView(){
    this.getAllTodos()
    this.getAllGroups()
  }

  
  ngOnChanges(): void {
    console.log("i am in...");
  }

  getAllGroups(){
    this.subscriber = this.groupsService.getGroups()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.groups = this.res.groups
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error(err.message)
    })
  }
  getAllTodos(){
    this.subscriber = this.todosService.getTodos()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.todos = this.res.todos
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }
  deleteGroup(id){
    console.log(id)
    this.subscriber = this.groupsService.deleteGroup(id)
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.groupTodosByGroup();
        console.log(this.res.message)
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }

  ////////////ORDER BY FUNCTIONS
  ///using simple bubble sort func
  orderTodosAlpha(){
    this.todos.sort((a,b)=> a.title > b.title ? 1:-1)
  }
  orderTodosByDate(){
    this.todos.sort((a,b)=> a.createdAt > b.createdAt ? 1:-1)
  }

  ///////////GROUP BY FUNCTIONS
  groupTodosByDay(){
    this.subscriber = this.todosService.getTodosGroupedByDay()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.groupedTodos = this.res.todos
        this.grouped=true
        console.log(this.groupedTodos)
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }
  groupTodosByMonth(){
    this.subscriber = this.todosService.getTodosGroupedByMonth()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.groupedTodos = this.res.todos
        this.grouped = true
        console.log(this.groupedTodos)
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error()
    })
  }
  groupTodosByGroup(){
    this.subscriber = this.todosService.getTodosGroupedByGroup()
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.groupedTodos = this.res.todos
        this.grouped = true
        console.log(this.groupedTodos)
      }
      else
        console.error(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }
/////////////////
///// GET TODOS BACK AFTER GROUPING (ungrouping)
getTodosBack(){
  this.updateView();
  this.grouped = false
}

////////////// ADD NEW TODO
  ////add todo func
  addNewTodo(todo){
    this.subscriber = this.todosService.createTodo(todo)
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        this.updateView();
        this.AddTodoForm.reset();      
      }
      else
        console.log(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }
  ///add todo modal
  closeResult = '';
  openTodoModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      ///if he hit submit
      this.addNewTodo(this.AddTodoForm.value)
    }, (reason) => {
      ///if he hit anything else
      console.log("closed:",reason)
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ////add todo form
  AddTodoForm = new FormGroup({
    title:new FormControl('',[
      Validators.required,
      Validators.maxLength(20)
    ]),
    body:new FormControl('',[
      Validators.required,
      Validators.maxLength(200)
    ]),
    group:new FormControl(null,[
      Validators.required
    ])
  })

////////////// ADD NEW GROUP
  ////add group func
  addNewGroup(group){
    this.subscriber = this.groupsService.addGroup(group)
    .subscribe((response)=>{
      this.res = response
      if(this.res.success){
        // this.groupTodosByGroup();
        this.updateView();
        this.AddGroupForm.reset();
      }
      else
        console.log(this.res.message)
    },
    (err)=>{
      console.error(err)
    })
  }
  ///add group modal
  openGroupModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      ///if he hit submit
      this.addNewGroup(this.AddGroupForm.value)

    }, (reason) => {
      ///if he hit anything else
      console.log("closed:",reason)
    });
  }

  ////add group form
  AddGroupForm = new FormGroup({
    title:new FormControl('',[
      Validators.required,
      Validators.maxLength(20)
    ]),
  })

  
  ngOnDestroy() {
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }
}
