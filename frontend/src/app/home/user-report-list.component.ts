import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User, Report } from '../_models';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';


let user = JSON.parse(localStorage.getItem('user')) || [];

@Component({
    selector: 'app-report',
    templateUrl: 'user-report-list.component.html',
    styleUrls: ['./home.component.scss']
})
export class UserReportListComponent implements OnInit {
    createReport: boolean = false;
    displayedReport: string[] = ['id', 'username', 'details', 'date']
    displayedReport2: string[] = ['id','username','details','date','approval']
    report: string;
    loading: boolean = false;
    loadingMyReport:boolean=false;
    selection = new SelectionModel<Report>(true, []);
    dataSource: MatTableDataSource<Report>;
    dataSource2:MatTableDataSource<Report>;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,

    ) { }
    ngOnInit() {
        this.getReport();
        this.getMyReport();

    }
    createNewReport() {
        this.createReport = true;
    }
    getReport() {
        this.accountService.getApproveList().subscribe(
            res => {
                console.log(res);
                this.dataSource = new MatTableDataSource(res);
                this.loading=true;
            }
        )
    }
    //get my report based on username
    getMyReport(){
        this.accountService.getMyReportList(user.id).subscribe(
            res=>{
                console.log(res);
                this.dataSource2 = new MatTableDataSource(res);
                this.loadingMyReport= true;
            }
        )

    }
    newreport(){
        this.router.navigate(['home/report'])
    }

    submitNewReport() {
        console.log(this.accountService.getUser.username)

        this.accountService.submitReport(this.accountService.getUser.username, this.report)
            .subscribe(
                data => {
                    console.log(data);

                },
                error => {


                }

            )
        console.log("submit!")
    }

    clear_data(){
        this.selection.clear()
        // this.selectedDataList.length=0;
    }

    selectRow(row) {
        console.log(row);

        this.router.navigate(['home/reportDetails', {data:row.id}])
    }







}