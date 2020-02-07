import { MOCK_CONSTANTS } from './../../../mocks.constants';
import { User } from './../../entities/user/user.entity';
import { ConfigService } from './../config/config.service';
import { RestService } from './../network/rest.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(private restService: RestService, private config: ConfigService) { }

    getUserByIpn(ipn: string): Observable<User> {
        if (!ipn) {
            return Observable.throw('Need an ipn')
        }
        return this.restService.get('/v1/users/' + ipn.toUpperCase())
            //.map(user => ({ ...user, ipn: user.ipn.toUpperCase() }))
            .map(user => User.createFromObject({ ...user, ipn: user.ipn.toUpperCase() }));
    }

    createUser(user: User): Observable<User> {
        const data = {
            ipn: user.ipn,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            organisation: user.organisation,
            gsfas: user.gsfas.map(g => g.id)
        };
        return this.restService.post('/v1/users', data)
            .map(user => User.createFromObject({ ...user, ipn: user.ipn.toUpperCase() }));
    }

    updateUser(user: User): Observable<any> {
        let u = {
            ipn: user.ipn,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            gsfas: user.gsfas.map(g => g.id),
            organisation: user.organisation,
            creationDate: user.creationDate,
            modificationDate: user.modificationDate
        };
        return this.restService.put('/v1/users', u)
            .map(user => User.createFromObject({ ...user, ipn: user.ipn.toUpperCase() }));
    }

    getUsers(roles = []): Observable<Array<User>> {
        if (this.config.get('mocked') === true) {
            return Observable.of(JSON.parse(MOCK_CONSTANTS.getUsers));
        }
        let filterStr = '?filter=';
        filterStr += (roles.length > 0 ? encodeURIComponent(JSON.stringify(roles)) : '');
        return this.restService.get('/v1/users' + filterStr)
            .map(users => users.filter(user => user).map(user => ({ ...user, ipn: user.ipn.toUpperCase() })))

    }

    deleteUser(user: User): Observable<any> {
        return this.restService.delete(`/v1/users/${user.ipn}`);
    }

    getEmptyUser(): User {
        const emptyUser: User = {
            ipn: '',
            historyIpn: '',
            username: '',
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            roles: [],
            gsfas: [],
            organisation: 'FR01',
            creationDate: '',
            modificationDate: ''
        };
        return emptyUser;
    }
}
