import { Component, Input, Inject, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Element } from '@angular/compiler';

@Component({
    selector: 'links-modal-field',
    templateUrl: 'links-modal-field.component.html',
    styleUrls: ['links-modal-field.component.scss']
})
export class LinksModalFieldComponent {

    @Input('label') label: string;
    @Input('value') value: string;
    @ViewChild('inputText') inputText: ElementRef;

    constructor( @Inject(DOCUMENT) private dom: Document) { }

    ngOnInit() {
        this.value = this.value || '';
    }

    copyToClipboard() {
        this.inputText.nativeElement.select();
        this.dom.execCommand('copy');
        let backup = this.value;
        this.value = 'Copié dans le presse-papier';
        setTimeout(() => this.value = backup, 1000);
    }
}
