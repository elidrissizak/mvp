import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { GROUPBYS } from './../../bim-assistant.constants';
import { SessionService } from './../../../../shared/services/session/session.service';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DrgGroupby } from '../../../shared/models/drg-groupby.interface';

interface GroupbySection {
    sectionName: string;
    exclusive: boolean;
    groupbys: Array<DrgGroupby>;
}

@Component({
    selector: 'groupby-bar',
    templateUrl: 'groupby-bar.component.html',
    styleUrls: ['groupby-bar.component.scss']
})
export class GroupbyBarComponent {

    @Input('disabled') disabled = true;
    @Input('disabled-groupby-names') disabledGroupbyNames = [];
    @Input('selection') selection: Array<DrgGroupby> = [];
    @Output('groupby-click') groupbyClick = new EventEmitter();

    selected: Array<DrgGroupby> = [];

    public sections: Array<GroupbySection> = [
        {
            sectionName: 'filter',
            exclusive: false,
            groupbys: [GROUPBYS['supplier'], GROUPBYS['nitg'], GROUPBYS['part']]
        },
        {
            sectionName: 'projet',
            exclusive: true,
            groupbys: [GROUPBYS['vehicleProject'], GROUPBYS['engineProject'], GROUPBYS['gearboxProject']]
        },
        {
            sectionName: 'indice',
            exclusive: true,
            groupbys: [GROUPBYS['vehicleIndex'], GROUPBYS['engineIndex'], GROUPBYS['gearboxIndex']]
        },
        {
            sectionName: 'usine',
            exclusive: true,
            groupbys: [GROUPBYS['vehicleFactory'], GROUPBYS['engineFactory'], GROUPBYS['gearboxFactory']]
        },
    ];

    constructor(
        private sessionService: SessionService,
        private drgsRepartitionService: DrgsRepartitionService) { }

    ngOnChanges(changes) {
        if (changes && changes.selection) {
            this.selected = changes.selection.currentValue;
        }
    }

    onGroupbyClick(groupby: DrgGroupby, section: GroupbySection) {
        if (this.disabled) {
            return;
        }
        if (this.isSelected(groupby)) {
            return;
        }
        if (section.exclusive === true) {
            // We keep the filters which are not in this section
            // (we reset the section)
            this.selected = this.selected.filter(gb => section.groupbys.includes(gb) === false);
        }
        this.selected.push(groupby);
        this.groupbyClick.emit(groupby);
    }

    isDisabled(groupby: DrgGroupby) {
        return this.disabled || this.disabledGroupbyNames.find(disableGroupbyName => disableGroupbyName === groupby.name);
    }

    isSelected(groupby: DrgGroupby) {
        // Note : we use the DrgGroupby.name instead of reference (d === groupby)
        // This, to avoid immutability side effects.
        return this.selected.find(d => d.name === groupby.name);
    }
}
