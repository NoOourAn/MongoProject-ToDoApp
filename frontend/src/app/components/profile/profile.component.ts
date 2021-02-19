import { Component, OnInit } from '@angular/core';
import { TodoDetailService } from 'src/app/services/todo-detail.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[TodoDetailService],
})
export class ProfileComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }
  logout(){
    this.usersService.logoutUser()
  }
}
