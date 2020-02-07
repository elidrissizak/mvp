import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { OAuthService } from "angular-oauth2-oidc";
import { User } from '../../entities/user/user.entity';

/**
 * Token stored in cookie or localStorage.
 */
export class Token {
    token: string;
}

@Injectable()
export class SessionService {

    private token;
    private user: User = undefined;
    private _onLoggedUser: ReplaySubject<User> = new ReplaySubject<User>();

    constructor(
        private oauthService: OAuthService) { }

    openAnonymousSession(): Observable<boolean> {
        return Observable.of(undefined);
    }

    openSession(token: Token): Observable<boolean> {
        console.log('openSession()');
        this.token = token;
        return Observable.of(true);
    }

    setUserInfo(firstName: string, lastName: string, userName: string) {
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = userName;
        this.user = user;
        localStorage.setItem('username', user.username);
        return;
    }

    getToken(): Token {
        if (!this.token) {
            let newToken = this.oauthService.getAccessToken();
            this.token = new Token();
            this.token.token = newToken;
            this.openSession(this.token);
            return this.token;
        }
        return this.token;
    }

    onLoggedUser(): Observable<User> {
        return this._onLoggedUser.asObservable();
    }

    getLoggedUser(): User {
        return this.user;
    }

    isLoggedIn(): boolean {
        return this.getToken() !== undefined;
    }

    logout(): Observable<boolean> {
        this.user = undefined;
        localStorage.removeItem('token');
        return Observable.of<boolean>(true);
    }

}
