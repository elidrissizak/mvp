import { RestService } from './../../../shared/services/network/rest.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core'

export type ApiRole = string;

export interface Role {
    id: string;
    label: string;
    color: string;
}

export type ROLES_TYPE = {
    [id: string]: Role;
}

export const ROLES: ROLES_TYPE = {
    'PRF': { id: 'PRF', label: 'COMMON.ROLE.PRF', color: ' #ffcb00' },
    'ADMIN_GENERAL': { id: 'ADMIN_GENERAL', label: 'COMMON.ROLE.ADMIN_GENERAL', color: ' #2ca5a4' },
    'ADMIN_INCIDENTOLOGIE': { id: 'ADMIN_INCIDENTOLOGIE', label: 'COMMON.ROLE.ADMIN_INCIDENTOLOGIE', color: ' #28485a' },
    'PRF_OTS': { id: 'PRF_OTS', label: 'COMMON.ROLE.PRF_OTS', color: ' #0088af' },
    'PRF_INTERNATIONAL': { id: 'PRF_INTERNATIONAL', label: 'COMMON.ROLE.PRF_INTERNATIONAL', color: ' #eadc00' },
    'Supplier': { id: 'Supplier', label: 'COMMON.ROLE.SUPPLIER', color: ' #ff8c46' },
    'Partner': { id: 'Partner', label: 'COMMON.ROLE.PARTNER', color: ' #006cab' },
    'Consultation': { id: 'Consultation', label: 'COMMON.ROLE.CONSULTATION', color: ' #8f4d52' },
};

@Injectable()
export class RoleService {

    constructor(private restService: RestService) { }

    getRoles(): Observable<Array<ApiRole>> {
        return this.restService.get('/v1/users/roles');
    }

}
