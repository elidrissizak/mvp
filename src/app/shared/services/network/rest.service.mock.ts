import { Observable } from 'rxjs/Rx';
import { Inject, Injectable } from '@angular/core';

interface UrlsProvider {
    onGet(uri: string): Observable<any>;
    onPost(uri: string): Observable<any>;
    onPut(uri: string): Observable<any>;
    onDelete(uri: string): Observable<any>;
}

export class MockRestService {

    constructor(private urlsProvider: UrlsProvider) { }

    public get(uri: string, params: any): Observable<any> {
        return Observable.of(this.urlsProvider.onGet(uri));
    }
    public post(uri: string, params: any): Observable<any> {
        return Observable.of(this.urlsProvider.onPost(uri));
    }
    public put(uri: string, params: any): Observable<any> {
        return Observable.of(this.urlsProvider.onPut(uri));
    }

    public getApiInfos(): Observable<any> {
        return Observable.of();
    }
}

