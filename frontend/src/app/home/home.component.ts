import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User } from '../_models';

@Component({
    selector:'app-home',
    templateUrl:'home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent implements OnInit{
    showReport: boolean = false;
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
    createNewReport(){
        this.showReport = true;
    }
}