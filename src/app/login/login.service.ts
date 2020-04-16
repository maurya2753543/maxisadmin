import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from "../../environments/environment";

@Injectable()
export class LoginService {
    constructor(private _http: HttpClient) {}
    /*Get User*/
    getUser(data): Observable<any> {
        let details = {
            userDetails:[JSON.parse(JSON.stringify(data))]
        };
        return this._http.post(environment.loginUrl+'/userPortal/getPermissionList',details); // UAT Server
    }
}

