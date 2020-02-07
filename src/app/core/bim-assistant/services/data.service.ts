import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private selectedCluster = new Subject<any>();
  result: any;
  private enableButton = new Subject<any>() ;
  
  constructor(private _http: Http) { 
    this.sendSupplier(false);
  }
  getUser(): Observable<any> {
    return this.selectedCluster.asObservable();
  }
  sendUser(cluster: any) {
    this.selectedCluster.next(cluster);
  }

  clearUser() {
    this.selectedCluster.next();
  }
  ifSupplier(): Observable<any> {
    return this.enableButton.asObservable();
  }
  sendSupplier(suplier: any) {
    this.enableButton.next(suplier);
  }
  
  clearSupplier() {
    this.enableButton.next();
  }
 
}
