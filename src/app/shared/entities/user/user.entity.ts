import { Gsfa } from './../../../core/shared/services/gsfa.service';

export class User {
    constructor(
        public id?: string,
        public ipn?: string,
        public historyIpn?: string,
        public username?: string,
        public email?: string,
        public phone?: string,
        public firstName?: string,
        public lastName?: string,
        public password?: string,
        public roles?: Array<string>,
        public gsfas?: Array<Gsfa>,
        public organisation?: string,
        public creationDate?: string,
        public modificationDate?: string) { }


    static createFromObject(o: Object): User {
        let user = new User();
        Object.keys(o).forEach(key => {
            if (user.hasOwnProperty(key)) {
                user[key] = o[key];
            }
        });
        return user;
    }
}
