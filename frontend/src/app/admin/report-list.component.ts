import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service';
import { User, Report } from '../_models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-report-list',
    templateUrl: './report-list.component.html',
    styleUrls: ['./admin.component.scss']
})
export class ReportListComponent implements OnInit {
    displayedReport: string[] = ['select', 'id', 'username', 'details', 'date', 'approval']
    dataSource: MatTableDataSource<Report>;
    selectedDataList : Report[] = [];
    selection = new SelectionModel<Report>(true, []);
    loading:boolean = false;
    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,
    ) {

    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }


    ngOnInit() {
        //   this.dataSource = new MatTableDataSource();
        this.getReportList();

    }
    selectRow(row) {
        console.log(this.selectedDataList)

        this.router.navigate(['admin/reportDetails', {data:row.id}])
    }

    selectionChange(event,row):void{
        if(event.checked ==true){
            this.selectedDataList.push(row);
 
        }
        else{
            this.selectedDataList = this.selectedDataList.filter((obj)=>{
                return obj.id !== row.id;
            })
        }
    }

    delete(){
        if(this.selectedDataList.length!=0){
            console.log("delete")
            this.accountService.deleteRows(this.selectedDataList).subscribe(
                res=>{
                    this.getReportList();
                    console.log(res);
                }
            )
        }
    }
    approve(){
        if(this.selectedDataList.length!=0){
            console.log("approve")
            this.accountService.approveRows(this.selectedDataList).subscribe(
                res=>{
                    this.getReportList();
                    console.log(res);
                }
            )
        }
    }
    unapprove(){
        if(this.selectedDataList.length!=0){
            console.log("unapprove")
            this.accountService.unapproveRows(this.selectedDataList).subscribe(
                res=>{
                    this.getReportList();
                    console.log(res);
                }
            )
        }
    }

    getReportList() {
        this.accountService.getReportList().subscribe(
            res => {
                console.log(res);
                this.dataSource = new MatTableDataSource(res);
                this.loading=true;
            }
        )
    }
    clear_data(){
        this.selection.clear()
        this.selectedDataList.length=0;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.clear_data():
            this.dataSource.data.forEach((row) => {
            this.selection.select(row)
            this.selectedDataList.push(row)
            });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Report): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        // console.log(row.id);
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
    logout() {
        this.accountService.logout();
    }

}