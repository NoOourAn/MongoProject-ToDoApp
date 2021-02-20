import { Component, OnInit,OnDestroy } from '@angular/core';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup ,FormControl , Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit ,OnDestroy{
  
  constructor(private usersService:UsersService,private router: Router) { }

  ngOnInit(): void {
  }
  //icons
  faUser = faUser;
  faLock = faLock;
  ///response // errors
  errorMsg
  usernameError
  passwordError
  res
  ///user input
  user
  ///
  subscriber


  ///login form using reactive forms
  LoginForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
    ]),
    password: new FormControl('',[
      Validators.required,
    ])
  })


  ///on submit login form
  login(){
    this.usernameError = null
    this.passwordError = null
    this.errorMsg = null
    if(this.LoginForm.status == "VALID"){
      const {username,password} = this.LoginForm.value
      this.user = {
        username,
        password,
      }
      this.subscriber = this.usersService.signInUser(this.user)
      .subscribe(
      (response)=>{
        this.res = response
        if(this.res.success){
          localStorage.setItem('token',this.res.token)
          // console.log(localStorage.getItem('token'))
          this.LoginForm.reset()
          this.router.navigate(['profile'])
        }
        else
          this.errorMsg = this.res.message   
      },
      (err)=>{
        this.errorMsg = "server error...please try again later"
      })
    }else{
      let err = this.LoginForm.controls.username.errors;
      if(err){
        this.usernameError = true
      }
      err = this.LoginForm.controls.password.errors
      if(err){
        this.passwordError = true
      }
    }

  }

  ngOnDestroy() {
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }
}
