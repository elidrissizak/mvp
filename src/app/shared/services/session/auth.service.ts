import { MOCK_CONSTANTS } from './../../../mocks.constants';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { APP_CONSTANTS } from './../../app.constants';
import { RestService } from './../network/rest.service';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './../config/config.service';
import { Token } from './session.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {

    constructor(
        private http: Http,
        private config: ConfigService,
        private oauthService: OAuthService,
        private restService: RestService,
        private router: Router) { }

    oauth(): boolean {
        if (this.config.get('disableAuthentication') === true) {
            this.router.navigate(['/authorized']);
            return true;
        }
        // Open ID Connect
        // source: https://github.com/manfredsteyer/angular-oauth2-oidc/blob/master/README.MD
        // Login-Url
        //let oidcConf = APP_CONSTANTS.OPEN_ID[window.location.hostname]
        this.oauthService.loginUrl = this.config.get('oauth').LOGIN_URL; //Id-Provider?
        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = this.config.get('oauth').REDIRECT_URL;
        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = this.config.get('oauth').CLIENT_ID;
        // set the scope for the permissions the client should request
        this.oauthService.scope = this.config.get('oauth').SCOPE;
        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;
        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);
        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oauthService.logoutUrl = this.config.get('oauth').LOGOUT_URL;
        // This method just tries to parse the token(s) within the url when
        // the auth-server redirects the user back to the web-app
        // It doesn't send the user to the login page
        return this.oauthService.tryLogin({});
    }

    oauthSignin() {
        this.oauthService.initImplicitFlow();
    }

    me() {
        if (this.config.get('disableAuthentication') === true || this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.oauth));
        }
        return this.restService.get('/v1/users/me');
    }

}

