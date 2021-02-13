import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare,faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  res
  faPlusSquare = faPlusSquare
  faTimes = faTimes
  todos=[]
  constructor(private todosService:TodosService,private modalService: NgbModal) { }

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

  ///add todo modal
  closeResult = '';
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}
