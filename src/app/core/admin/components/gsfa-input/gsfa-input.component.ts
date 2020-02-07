import { LanguageService } from './../../../../shared/services/language/language.service';
import { Gsfa } from './../../../shared/services/gsfa.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { Observable } from 'rxjs/Rx';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, forwardRef, Input, EventEmitter, Output, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Renderer2 } from '@angular/core/src/render/api';

@Component({
    selector: 'gsfa-input',
    templateUrl: 'gsfa-input.component.html',
    styleUrls: ['gsfa-input.component.scss'],
})
export class GsfaInputComponent {

    @Input('gsfas') gsfas;
    @Output() gsfasChange = new EventEmitter();
    @Output('on-add') onAddEvent = new EventEmitter<void>();

    @ViewChild('input') input: ElementRef;
    public opened = false;
    public typedByUser = '';

    constructor(
        private renderer: Renderer,
        private languageService: LanguageService
    ) { }

    getLabelProp() {
        return this.languageService.getLanguage() === 'fr' ? 'frenchLabel' : 'englishLabel';
    }

    onAdd() {
        this.opened = true;
        this.renderer.selectRootElement('#inputText').focus();
        //this.input.nativeElement.focus();
    }

    onCancel() {
        this.opened = false;
        this.typedByUser = '';
    }

    _filterGsfas = (token: string): Array<Gsfa> => {
        return this.gsfas
            .filter(d => d[this.getLabelProp()].toLowerCase().indexOf(this.typedByUser.toLowerCase()) !== -1)
            .sort((a, b) => a[this.getLabelProp()] > b[this.getLabelProp()]);
    };

    // Real-time available gsfas
    public gsfasList = Observable.of(this.gsfas).map(this._filterGsfas);

    onSelect(item) {
        this.onAddEvent.emit(item.item);
        this.opened = false;
        this.typedByUser = '';
    }
}
