import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Route } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component'
import { AuthGuard } from './auth.guard'

const routes = [ // should use canActivate property. canActivate takes in an Auth guard
  {path:'register',redirectTo:'',pathMatch:'full'},
  {path:'',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component:ProfileComponent
  },
  {path:'**',component:ErrorComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
