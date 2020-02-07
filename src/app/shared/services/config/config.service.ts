import { APP_CONSTANTS } from './../../app.constants';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * This service load the config.json file and provide
 * access to its object.
 */
@Injectable()
export class ConfigService {

    public config: Object;

    private configsRenault = APP_CONSTANTS.CONFIG;

    constructor(private http: Http) { }

    public getHostname(): string {
        return window.location.hostname;
    }

    public load(uri = '/config.json'): Promise<boolean> {
        // hardcoded urls for prod
        let hostname = this.getHostname();
        if (this.configsRenault[hostname] !== undefined) {
            return this._loadProdConfig(hostname);
        }
        // dynamic config.json for RD
        return new Promise((resolve, reject) => {
            this.http.get(uri)
                .map(data => data.json())
                .subscribe(data => {
                    console.log('Loaded config: ', data);
                    this.config = data;
                    resolve(true);
                });
        });
    }

    private _loadProdConfig(env): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.config = this.configsRenault[env];
            console.log('Loaded config: ', this.config);
            resolve(true);
        });
    }

    public get(key: string): any {
        return this.config[key];
    }
}
