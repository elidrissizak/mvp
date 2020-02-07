import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/ng2-bootstrap';

@Component({
    selector: 'button-modal',
    templateUrl: 'button-modal.component.html',
    styleUrls: ['./button-modal.component.scss']
})
export class ButtonModalComponent {

    bsModalRef: BsModalRef;

    @Input() component: any;
    @Input() text = 'Click me!';
    @Input() options: any = {};
    @Input() params: any = {};
    @Input() cluster: any = {};
    @Input() successCallback: Function = function () { };
    @Input() errorCallback: Function = function () { };
    
    constructor(private modalService: BsModalService) { 
    }

    openModal(): void {
        this.bsModalRef = this.modalService.show(this.component);
        this.bsModalRef.content.params = this.cluster;
        console.log("Cluster selected in open Modal => ", this.cluster);
        this._handleModalResponse();
    }

    private _handleModalResponse() {
        this.modalService.onHide.subscribe(() => {
            this.bsModalRef.content.confirm === true
                ? this.successCallback()
                : this.errorCallback();
        });
    }

}
