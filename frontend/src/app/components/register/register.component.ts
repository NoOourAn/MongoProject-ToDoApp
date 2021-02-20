import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup ,FormControl , Validators} from '@angular/forms';
import { faUser,faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users.service';
// import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit ,OnDestroy{
  //response
  successMsg;
  errorMsg;
  res;
  //icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  //user input
  newUser;
  ////
  subscriber


  constructor(private usersService:UsersService) { }
 
  ngOnInit(): void {
  }

  ///register form using reactive forms
  RegForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"),
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"),
    ])
  })

  usernameError
  emailError
  passwordError
  ///register function
  register(){
    this.usernameError = null
    this.emailError = null
    this.passwordError = null
    this.errorMsg = null
    this.successMsg = null
    if(this.RegForm.status == "VALID"){
      const {username,email,password} = this.RegForm.value
      this.newUser = {
        username,
        email,
        password,
      }
      this.subscriber = this.usersService.addUser(this.newUser)
      .subscribe((response)=>{
        this.res = response
        if(this.res.success){
          this.successMsg = this.res.message
          this.RegForm.reset()
        }
        else
          this.errorMsg = this.res.message   
      },
      (err)=>{
        // console.log(err)
        this.errorMsg = "server error...please try again later"
      })
    }else{
      let err = this.RegForm.controls.username.errors;
      if(err){
        if(err.required)  this.usernameError = "* we need username to welcome You?"
        if(err.minlength) this.usernameError = "* username should be minimum 3 letters"
        if(err.maxlength) this.usernameError = "* username should be maximum 15 letters"
      }
      err = this.RegForm.controls.email.errors
      if(err){
        if(err.required)  this.emailError = "* what about the email?!"
        if(err.pattern)   this.emailError = "* Are U trying to fool us with fake email?"
      }
      err = this.RegForm.controls.password.errors
      if(err){
        if(err.required)  this.passwordError = "* you are strong, you need a strong password as well!"
        if(err.pattern)   this.passwordError = "* your password should contain Atleast 1 capital letter, 1 digit and be minimum 8 long"
      }
    }
  } 

  ngOnDestroy() {
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }

}
