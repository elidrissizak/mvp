import { Injectable } from '@angular/core';

@Injectable()
export class MockOAuthService {
    getAccessToken() {
        return 'accessToken';
    }
}
