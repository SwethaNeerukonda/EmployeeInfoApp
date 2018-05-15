import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeeInfoService {

  constructor(private http: HttpClient) { }


  public getEmployeeInfo(): Observable<any> {
    return this.http.get('/assets/data/employee-info.json');

  }

}
