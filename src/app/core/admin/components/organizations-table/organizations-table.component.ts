import { TaskService } from './../../../../shared/services/task/task.service';
import { Organization } from '../../../shared/services/organization/organization.model';
import { OrganizationService } from './../../../shared/services/organization/organization.service';
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../../../shared/services/currency/currency.service';

@Component({
    selector: 'organizations-table',
    templateUrl: './organizations-table.component.html',
    styleUrls: ['./organizations-table.component.scss']
})
export class OrganizationsTableComponent implements OnInit {

    @Input() organizationsList: any[];
    @Input() currencies;

    public enteredFees = 0;
    public enteredCurrency = '';

    public editedOrganization: Organization = undefined;

    //public currencies;

    constructor(
        private taskService: TaskService,
        private currencyService: CurrencyService,
        private organizationService: OrganizationService) { }

    ngOnInit() {
        // this.currencyService.getCurrencies()
        //     .subscribe(currencies =>
        //         // Transform currencies array to object for id indexing.
        //         this.currencies = currencies.reduce((prev, cur) => { prev[cur.id] = cur; return prev; }, {}));
    }

    submitEdit(organization: Organization) {
        organization.distributionFees = this.enteredFees;
        organization.currencyCode = this.enteredCurrency;
        this.taskService.do(this.organizationService.updateDistributionFees(organization))
            .subscribe(() => this.editedOrganization = undefined);
    }

    cancelEdit(organization) {
        this.editedOrganization = undefined;
    }

}
