import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AccountService, AlertService } from '../_service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
    selector:'app-register',
    templateUrl:'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    hide = true;
    registerForm:FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private accountSerivce:AccountService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        ){}

    ngOnInit(){
        this.registerForm= this.formBuilder.group({
            username:['',Validators.required],
            password:['',Validators.required],
        })

    }

    matchPassword(password,passwordConfirm){
        return password === passwordConfirm ? null : false;
    }

    onSubmit(){

        this.accountSerivce.register(this.registerForm.value)
        .subscribe(
            data=>{
                console.log(data);
                this.router.navigate(['/login'])
            },
            error=>{
                this.alertService.error(error);
                
            }

        )

    }

    get f() { return this.registerForm.controls; }


}