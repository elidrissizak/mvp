import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'input-toggle',
    templateUrl: './input-toggle.component.html',
    styleUrls: ['./input-toggle.component.scss']
})
export class InputToggleComponent {

    @Input() labelOn: string;
    @Input() labelOff: string;
    @Input() value: boolean;
    @Output() valueChange = new EventEmitter<boolean>();

    changeState() {
        this.valueChange.emit(this.value);
    }

}
