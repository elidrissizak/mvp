import { Injectable } from '@angular/core';


@Injectable()
export class MockConfigService {
    get(key) {
        return false; // mocked
    }
}
