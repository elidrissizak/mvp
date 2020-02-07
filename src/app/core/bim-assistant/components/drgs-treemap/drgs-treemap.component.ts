import { TaskService } from './../../../../shared/services/task/task.service';
import { DrgsRepartitionService } from './../../../shared/services/drgs-repartition.service';
import { DateToMysqlDatePipe } from './../../../shared/pipes/date-to-mysql-date.pipe';
import { ColorService } from './../../../shared/services/color.service';
import { TreemapDatum } from './../../../shared/components/treemap/treemap.component';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { DrgsTreemapDatum, STATE } from '../../services/fetch-drgs.service';
import { SessionService } from '../../../../shared/services/session/session.service';


@Component({
    selector: 'drgs-treemap',
    templateUrl: 'drgs-treemap.component.html'
})
export class DrgsTreemapComponent {

    @Input('data') data: Array<DrgsTreemapDatum>;
    @Input('width') width = 1000;
    @Input('height') height = 1000;
    @Input('active') active;
    @Input('multiple-selection') multipleSelection = true;
    @Input('colors') colors: Object;
    @Input('color-neutral') colorNeutral = [];
    @Input('color-highlighted') colorHighlighted = [];
    @Input('color-selected') colorSelected = [];
    @Input('color-neutral-text') colorNeutralText = [];
    @Input('color-highlighted-text') colorHighlightedText = [];
    @Input('color-selected-text') colorSelectedText = [];
    @Input('with-supplier') withSupplier: boolean;
    @Output('on-select-by-click') onSelectByClick = new EventEmitter<any>();
    @Output('on-unselect-by-click') onUnselectByClick = new EventEmitter<any>();
    @Output('on-mouseover') onMouseOver = new EventEmitter<any>();
    @Output('on-mouseout') onMouseOut = new EventEmitter<any>();
    @Output('on-right-click') rightClickEvent = new EventEmitter<any>();

    constructor(
        private taskService: TaskService,
        private drgsRepartitionService: DrgsRepartitionService,
        private session: SessionService,
        private colorService: ColorService,
        private dateToMysqlDatePipe: DateToMysqlDatePipe,
        private translate: TranslateService) { }

    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue) {
            this.data = this._colorizeTreemap(changes.data.currentValue);
        }
        if (changes.active) {
            this.data = this._colorizeTreemap(this.data);
        }
    }

    // Reminder : we are trying to be functional and immutable.
    // We feed the raw treemap component with new data every time it needs to be updated.
    private _process(stateUpdater) {
        this.data = this._colorizeTreemap(this.data.map(d => ({ ...d, state: stateUpdater(d) })));
    }

    private _colorizeTreemap(data): Array<DrgsTreemapDatum> {
        return data.map((d: DrgsTreemapDatum): DrgsTreemapDatum => {
            let tmDatum = d;
            let active;
            let stateRef;
            active = this.active ? 'active' : 'inactive';
            stateRef = d.state === STATE.NEUTRAL ? 'neutral' : stateRef;
            stateRef = d.state === STATE.HIGHLIGHTED ? 'highlighted' : stateRef;
            stateRef = d.state === STATE.SELECTED ? 'selected' : stateRef;
            tmDatum.backgroundColor = this.colors[active][stateRef].background;
            tmDatum.textColor = this.colors[active][stateRef].text;
            return tmDatum;
        });
    }

    // Quand on mouseover sur un bloc, celui-ci est highlight,
    // sauf s'il est selected. Les autres blocs ne changent pas.
    public onPacketOver(packet: DrgsTreemapDatum) {
        this._process(d => d.id === packet.id && d.state !== STATE.SELECTED ? STATE.HIGHLIGHTED : d.state);
        this.onMouseOver.emit(packet);
    }

    // Quand on mouseout un bloc, il est mis à neutral,
    // sauf s'il est selected. Les autres blocs ne changent pas.
    public onPacketOut(packet: DrgsTreemapDatum) {
        this._process(d => d.id === packet.id && d.state !== STATE.SELECTED ? STATE.NEUTRAL : d.state);
        this.onMouseOut.emit(packet);
    }

    public onPacketClick(tmDatum: DrgsTreemapDatum) {
        // We have to retrieve the packet from our local updated array because D3 does not update
        // the embedded data in the DOM nodes (__data__ attribute) except when there
        // are news ones, or some to remove.
        // D3 will use a discriminator like this :
        // let joined = this.rootNode.selectAll("g").data(nodes, d => d.id);
        let packet = this.data.find(packet => packet.id === tmDatum.id);
        let toSelect = packet.state === STATE.HIGHLIGHTED;
        this.selectPacket(packet)
        if (toSelect) {
            this.onSelectByClick.emit(packet);
        }
        else {
            // Ok, là c'est pas du tout fini
            if (this.multipleSelection) {
                this.onUnselectByClick.emit(packet);
            }
        }
    }

    // highlight from outside.
    // All packets are set to neutral, except :
    // - the one to be higlighted (set to... higlight)
    // - the currently selected packet (does not change).
    // Notice the use of rawDatum. This is the link between
    // the two treemaps : each packet in one has it "brother"
    // in the other.
    public lightOnPacket(packet: DrgsTreemapDatum) {
        this._process(d => {
            if (d.state !== STATE.SELECTED) {
                return d.rawDatum.id === packet.rawDatum.id ? STATE.HIGHLIGHTED : STATE.NEUTRAL;
            }
            return d.state;
        });
    }

    // Un-hightlight from outside
    // The highlighted is unhiglighted, the currently selected does not change,
    // the others are set to neutral.
    public lightOffPacket(packet: DrgsTreemapDatum) {
        this._process(d => d.rawDatum.id === packet.rawDatum.id && d.state !== STATE.SELECTED ? STATE.NEUTRAL : d.state);
    }

    // Select from outside.Might be called from an outer component (see bim-assistant.component.ts)
    public selectPacket(packet: DrgsTreemapDatum) {

        this._process(d => {
            if (this.multipleSelection === true) {
                if (d.rawDatum.id === packet.rawDatum.id) {
                    return d.state === STATE.SELECTED ? STATE.NEUTRAL : STATE.SELECTED;
                } else {
                    return d.state;
                }
            } else {
                return d.rawDatum.id === packet.rawDatum.id ? STATE.SELECTED : STATE.NEUTRAL;
            }
        });
    }

    public onRightClick(tmDatum) {
        this.rightClickEvent.emit(tmDatum);
    }
}
