import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register';
import { AlertComponent } from './_component';
import { ErrorInterceptor } from './_helper';
import { ReportComponent } from './home/report.component';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor } from './_helper/jwt.interceptors';
import { ReportListComponent } from './admin/report-list.component';
import { ReportDetailsComponent } from './admin/view-report.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ReportComponent,
    AdminComponent,
    ReportListComponent,
    ReportDetailsComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatToolbarModule,
    MatGridListModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatListModule,
    MatTableModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor , multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
