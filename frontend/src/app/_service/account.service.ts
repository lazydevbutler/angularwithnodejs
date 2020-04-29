import {Injectable} from'@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User, Report } from '../_models';
import { map, catchError, tap } from 'rxjs/operators';
import * as environment from '../../../environment.json'
import { ok } from 'assert';

let user = JSON.parse(localStorage.getItem('user')) || [];

@Injectable({providedIn:'root'})
export class AccountService{

    private userSubject: BehaviorSubject<User>;
    public user:Observable<User>;


    constructor(
        private router: Router,
        private http: HttpClient,
    ){
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    logout(){
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }
    login(username,password){
        return this.http.post<User>(`${environment.apiURL}/api/user/authenticate`,{username,password})
            .pipe(
            map(user=>{
                localStorage.setItem('user',JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            })
            )

    }

    public get getUser():User{
        return this.userSubject.value;
    }

    register(user:User):Observable<User>{
        return this.http.post<User>(`${environment.apiURL}/api/user/register`,user)
    }

    submitReport(user,details){
        console.log(details);
        return this.http.post<User>(`${environment.apiURL}/api/report/entry`,{user,details});
    }

    getReportList():Observable<Report[]>{
        return this.http.get<Report[]>(`${environment.apiURL}/api/report/allReports`);
    }
}