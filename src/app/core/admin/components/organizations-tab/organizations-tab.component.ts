import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'organizations-tab',
    templateUrl: 'organizations-tab.component.html',
    styleUrls: ['./organizations-tab.component.scss']
})
export class OrganizationsTabComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        const options = {
            organizationsTab: ['organizations-list']
        };
        this.router.navigate(['/core/admin/', { outlets: options }]);
    }
}
