import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  
  readonly apiURL="assets";
  public observer:Observable<Object>;
  constructor(private http:HttpClient) { }

  getTechnologies(){
    return this.http.get(this.apiURL+"/framework-versions.json");
  }

  checkEmail(){
    return this.http.get(this.apiURL+"/registered-emails.json");
  }
}
