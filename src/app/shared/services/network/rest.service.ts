import { Observable } from "rxjs/Observable";
import { SessionService } from "./../session/session.service";
import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, ResponseContentType } from "@angular/http";
import { ConfigService } from "./../config/config.service";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class RestService {

    constructor(
        private http: Http,
        private config: ConfigService,
        private oauthService: OAuthService,
        private sessionService: SessionService) { }

    public checkHealth(): Observable<boolean> {
        return this.http.get(this.config.get('healthEndpoint'))
            .map(res => res.json())
            .map(data => data.status === 'UP')
            .catch((err, caught) => {
                return Observable.of(false)
            });
    }

    public get(uri: string, params?: any): Observable<any> {
        let url = this.config.get('apiUrl') + uri;
        let token = this.sessionService.getToken();
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }),
            params
        });
        return this.http.get(url, options)
            .map(data => {
                return data.json();
            })
            .retryWhen(errors => this.handleRetry(errors, url))
            .catch((err, caught) => {
                return Observable.throw({
                    url,
                    code: err.code,
                    body: err._body,
                    message: `Network/REST error on URL ${url}, status ${err.status}, body: ${err._body}`
                });
            });
    }

    public download(uri: string): Observable<any> {
        let url = this.config.get('apiUrl') + uri;
        let token = this.sessionService.getToken();
        let options = new RequestOptions({
            responseType: ResponseContentType.Blob,
            headers: new Headers({
                'Authorization': 'Bearer ' + token.token,
                'accept-language': 'en'
            })
        });
        return this.http.get(url, options)
            .map(res => res.blob())
            .retryWhen(errors => this.handleRetry(errors, url));
    }

    public post(uri: string, body = undefined): Observable<any> {
        let url = this.config.get('apiUrl') + uri;
        let headers = { 'Content-Type': 'application/json' }
        let token = this.sessionService.getToken();
        headers['Authorization'] = token ? 'Bearer ' + token.token : undefined;
        let options = new RequestOptions({ headers: new Headers(headers) });
        return this.http.post(url, body, options)
            .map(data => data.json())
            .catch((err, caught) => {
                try {
                    return Observable.throw(`RestService.post(${url}): ` + err.json());
                }
                catch (ex) {
                    return Observable.throw(`RestService.post(${url}): ` + err);
                }
            });
    }

    public put(uri: string, body = undefined): Observable<any> {
        let url = this.config.get('apiUrl') + uri;
        let headers = { 'Content-Type': 'application/json' }
        let token = this.sessionService.getToken();
        headers['Authorization'] = token ? 'Bearer ' + token.token : undefined;
        let options = new RequestOptions({ headers: new Headers(headers) });
        return this.http.put(url, body, options)
            .map(data => data.json())
            .catch((err, caught) => {
                try {
                    return Observable.throw(`RestService.put(${url}): ` + err.json());
                }
                catch (ex) {
                    return Observable.throw(`RestService.put(${url}): ` + err);
                }
            });
    }

    public patch(uri: string, body = undefined): Observable<any> {
        let url = this.config.get('apiUrl') + uri;
        let headers = { 'Content-Type': 'application/json' }
        let token = this.sessionService.getToken();
        headers['Authorization'] = token ? 'Bearer ' + token.token : undefined;
        let options = new RequestOptions({ headers: new Headers(headers) });
        return this.http.patch(url, body, options)
            .map(data => {
                return data.text() ? data.json() : undefined
            })
            .catch((err, caught) => {
                try {
                    return Observable.throw(`RestService.patch(${url}): ` + err.json());
                }
                catch (ex) {
                    return Observable.throw(`RestService.patch(${url}): ` + err);
                }
            });
    }

    public delete(uri: string): Observable<any> {
        const url = this.config.get('apiUrl') + uri;
        const headers = { 'Content-Type': 'application/json' }
        const token = this.sessionService.getToken();
        headers['Authorization'] = token ? 'Bearer ' + token.token : undefined;
        const options = new RequestOptions({ headers: new Headers(headers) });
        return this.http.delete(url, options)
            .map(data => data.json())
            .catch((err, caught) => {
                try {
                    return Observable.throw(`RestService.delete(${url}): ` + err.json());
                }
                catch (ex) {
                    return Observable.throw(`RestService.delete(${url}): ` + err);
                }
            });
    }

    private handleRetry(errors: Observable<Response>, url: string): Observable<any> {

        return errors.mergeMap(error => {

            if (error.status === 401 && !this.isLoggedIn()) {
                // PUTAIN DE BRICOLAGE !!!!
                this.config.get('disableAuthentication') !== true && this.oauthService.initImplicitFlow();
                return Observable.of(error);
            }
            if (error.status === 0) {
                // Emit anything (the error instance, for example) to retry:
                return Observable.of(error);

            } else {
                // Throw the error to give up retrying:
                return Observable.throw({
                    url,
                    code: error.status,
                    body: error.body,
                    message: `Network/REST error on URL ${url}, status ${error.status}, body: ${error.body}`
                });
            }
        }).delay(5000).take(4).concat(Observable.throw(Observable.throw({
            url,
            code: 0,
            body: 'no body',
            message: `Network/REST error on URL ${url}, status 0`
        }
        )));
    }

    private isLoggedIn() {
        return this.oauthService.hasValidAccessToken();
    }

    public getApiInfos() {
        return Observable.of({ app: { version: '1.0.2' } });
    }
}
