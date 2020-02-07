import { Component, Input, OnDestroy } from '@angular/core';

/**
 * This spinner component is displayed above an overlay.  
 * It shows two things : 
 *  * the animated spinner itself
 *  * a list of tasks (given as input)
 * It is used by task service to display the pending tasks.
 */
@Component({
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.scss']
})
export class SpinnerComponent {
    @Input('tasks') tasks = undefined;
}
