import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss'],
})
export class AdminComponent implements OnInit {

    public tabs = {};

    constructor(private router: Router) { }

    ngOnInit() {
        this.tabs['users'] = { enable: true };
        this.tabs['organizations'] = { enable: false };
    }

    enableTab(tab) {
        tab.enable = true;
    }
}
