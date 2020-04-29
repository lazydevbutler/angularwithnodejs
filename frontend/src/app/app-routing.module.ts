import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helper';
import { RegisterComponent } from './register';
import { Role } from './_models';


// const userModule = () => import('./user/user.module').then(x => x.UserModule);
// const adminModule = () =>

const homeModule = () => import('./home/home-router.module').then(x=>x.HomeRoutingModule);
const adminModule = () => import('./admin/admin-routing.module').then(x=>x.AdminRoutingModule);

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'', loadChildren:homeModule,canActivate:[AuthGuard],data:{roles:[Role.User]}},
  {path:'',loadChildren:adminModule,canActivate:[AuthGuard],data:{roles:[Role.Admin]}},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  // {path:'user',loadChildren:''},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
