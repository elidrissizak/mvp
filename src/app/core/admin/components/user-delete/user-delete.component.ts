import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../shared/entities/user/user.entity';


@Component({
    selector: 'user-delete',
    templateUrl: 'user-delete.component.html',
    styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

    // TODO: get profiles from server ?
    userProfiles: string[];

    constructor(public bsModalRef: BsModalRef) { }

    ngOnInit() {
        this.userProfiles = [
            'Admin PRF',
            'PRF',
            'PRF International',
            'PRF OTS',
            'Incidentologie',
            'Fournisseurs (pas de GSFA)',
            'Partenaire (Tous GSFA)',
            'Consultation'
        ];
    }

    cancel(): void {
        this.bsModalRef.content.confirm = false;
        this._closeModal();
    }

    confirm(): void {
        this.bsModalRef.content.confirm = true;
        this._closeModal();
    }

    private _closeModal(): void {
        this.bsModalRef.hide();
    }
}
