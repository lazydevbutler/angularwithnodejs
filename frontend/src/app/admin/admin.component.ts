import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User } from '../_models';

@Component({
    selector:'app-admin',
    templateUrl:'./admin.component.html',
    styleUrls:['./admin.component.scss']
})
export class AdminComponent implements OnInit{
    user: User
    

    constructor(
        private accountService : AccountService
        ){
        this.user = this.accountService.getUser;
        console.log(this.user)
    }


    ngOnInit(){
      
    }
    logout(){
        this.accountService.logout();
    }
   
}