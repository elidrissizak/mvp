import { Component, Input } from '@angular/core';

/**
 * This icon component display a SVG icon.  
 * There are two ways to set the icon source :  
 *  * as an id from the DOM (see core-icons.component.html)
 *  * as an external file
 * The external file is detected by a starting slash (/assets/xxxxx.svg)
 */
@Component({
    selector: 'icon',
    templateUrl: 'icon.component.html',

    styles: [`
    svg {
        width: inherit;
        height: inherit;
    }`]
})
export class IconComponent {

    public _ref: string;

    @Input('ref') set ref(r: string) {
        this._ref = r.startsWith('/') ? r : ('#' + r);
    }
}
