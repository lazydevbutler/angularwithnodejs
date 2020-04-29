import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User, Report } from '../_models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector:'app-report-list',
    templateUrl:'./report-list.component.html',
    styleUrls:['./admin.component.scss']
})
export class ReportListComponent implements OnInit{
    displayedReport: string[] = ['id','username','details','date','approval']
    dataSource :MatTableDataSource<Report>
    reportlists: Report[];
    reportlistsEmpty=[]
    selection = new SelectionModel<Report>(true, []);
    constructor(
        private accountService : AccountService
        ){

    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.reportlists.data.length;
        return numSelected === numRows;
      }


    ngOnInit(){
      this.dataSource = new MatTableDataSource();
      this.getReportList();
      this.accountService.getReportList().subscribe(
          res=>{
              this.dataSource = res
          }
      )
    }

    getReportList(){
        
    }
    logout(){
        this.accountService.logout();
    }
   
}