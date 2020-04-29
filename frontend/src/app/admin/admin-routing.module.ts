import { NgModule} from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'
import { ReportDetailsComponent } from './view-report.component'
import { ReportListComponent } from './report-list.component'


const routes: Routes=[
    {
        path:'admin', component:AdminComponent,
        children:[
            {path:'reportList',component:ReportListComponent},
            {path:'reportDetails',component:ReportDetailsComponent}
        ]

    }
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule{}