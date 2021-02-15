import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { RoutingModule } from './modules/routing.module';
import { ErrorComponent } from './components/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersService } from './services/users.service';
import { TodosService } from './services/todos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { GroupsService } from './services/groups.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TodosComponent,
    TodoComponent,
    TodoDetailComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UsersService,
    TodosService,
    GroupsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
