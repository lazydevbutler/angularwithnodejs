import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User } from '../_models';

@Component({
    selector:'app-report',
    templateUrl:'report.component.html',
    styleUrls:['./home.component.scss']})
export class ReportComponent implements OnInit{
    createReport: boolean = false;
    report: string;

    constructor(
       private accountService:AccountService
    ){}
   ngOnInit(){

   }
   createNewReport(){
    this.createReport = true;
   }

   submitNewReport(){
       console.log(this.accountService.getUser.username)
       
       this.accountService.submitReport(this.accountService.getUser.username,this.report)
       .subscribe(
        data=>{
            console.log(data);
            
        },
        error=>{
           
            
        }

    )
    console.log("submit!")
   }
}