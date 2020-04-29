import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService,AlertService} from '../_service';
import {first} from 'rxjs/operators';


@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
    hide = true;

    loading=false;
    submitted=false;
    loginForm:FormGroup;
    errorLogin:boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService:AccountService,
        private alertService:AlertService,
        
    ){
        // if(this.accountService.){

        // }
    }


    ngOnInit(){
        this.loginForm = this.formBuilder.group({
            username:['',Validators.required],
            password:['',Validators.required]
        })
    }
    get f() { return this.loginForm.controls; }

    onSubmit(){
        this.submitted = true;
        this.alertService.clear();
        if(this.loginForm.invalid){
            return;
        }

        this.loading=true;
        this.accountService.login(this.f.username.value,this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                   console.log(data);
                   if(data.role==="admin"){
                    this.router.navigate(['./admin/reportList'])
                   }
                   else{
                   this.router.navigate(['/home/reportList']);
                   }
                   this.errorLogin = false;
                },
                error => {
                    console.log(error);
                    this.errorLogin = true;
                    this.alertService.error(error);
                    this.loading = false;
                });
            

        console.log("username - " + this.f.username.value)
        console.log("password - " + this.f.password.value)
    }

    onRegister(){

    }
}