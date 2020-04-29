import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User } from '../_models';

@Component({
    selector:'app-view-report',
    templateUrl:'./view-report.component.html',
    styleUrls:['./admin.component.scss']
})
export class ReportDetailsComponent implements OnInit{
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