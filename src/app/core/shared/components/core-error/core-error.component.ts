import { Component, Input } from '@angular/core';
@Component({
    selector: 'core-error',
    templateUrl: 'core-error.component.html',
    styleUrls: ['core-error.component.scss']
})
export class CoreErrorComponent {

    @Input('message') message: string;
}
