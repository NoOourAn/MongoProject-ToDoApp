import { Component, OnInit } from '@angular/core';
import { TodoDetailService } from 'src/app/services/todo-detail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[TodoDetailService],
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
