import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';

/**
 * Usage : <drg-unit-selector [(ngModel)]="unit" />  
 * Display three littles boxes that act as radio buttons.  
 * User can select between percentage, amount and count of DRGs.  
 * 
 * This is a 2-ways data binding component through the ControlValueAccessor
 * method. This is over-engineered because we just need a one-way input, and
 * an event output to make this work.
 */
@Component({
    selector: 'drg-unit-selector',
    templateUrl: 'drg-unit-selector.component.html',
    styleUrls: ['drg-unit-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DrgUnitSelectorComponent),
            multi: true
        }
    ]
})
export class DrgUnitSelectorComponent implements ControlValueAccessor {

    public unit: string;
    @Output('change') change = new EventEmitter();

    writeValue(value: any): void {
        this.unit = value;
    }

    propagateChange = (_: any) => { };
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    switchTo(unit: string) {
        this.unit = unit;
        this.propagateChange(this.unit);
        this.change.emit(unit);
    }

    registerOnTouched(fn: any): void { }
}
