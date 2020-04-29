import { NgModule} from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'
import { LoginComponent } from '../login'
import { RegisterComponent } from '../register'
import { ReportComponent } from './report.component'
import { UserReportListComponent } from './user-report-list.component'
import { HomeReportDetailsComponent } from './view-report.component'

const routes: Routes=[
    {
        path:'home', component:HomeComponent,
        children:[
            {path:'reportList',component:UserReportListComponent},
            {path:'report',component:ReportComponent},
            {path:'reportDetails',component:HomeReportDetailsComponent}
        ]

    }
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HomeRoutingModule{}