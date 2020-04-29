import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User, Report } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector:'app-home-view-report',
    templateUrl:'./view-report.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeReportDetailsComponent implements OnInit{
    report: Report
    id: number;
    loading:boolean = false;
    

    constructor(
        private accountService : AccountService,
        private route: ActivatedRoute,
        private router: Router,
        ){
          
         }


    ngOnInit(){
        this.id = this.route.snapshot.params.data;
        // console.log(this.id);
        this.getSingleReport(this.id)
    }
    getSingleReport(id){
        this.accountService.getReport(id).subscribe(
            res=>{
                this.report = res;
                this.loading = true;
                console.log(this.report)
            }
        )
    }
    goback(){
        this.router.navigate(['home/reportList'])
    }
    logout(){
        this.accountService.logout();
    }
   
}