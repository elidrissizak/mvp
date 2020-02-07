import { Injectable } from '@angular/core';
import { User } from '../../entities/user/user.entity';

@Injectable()
export class MockSessionService {
    getLoggedUser() {
        return new User();
    }

    getToken() {
        return 'token';
    }

}

