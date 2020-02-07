import { DrgView } from './../../../shared/models/drg-view.interface';
import { DateToMysqlDatePipe } from "./../../../shared/pipes/date-to-mysql-date.pipe";
import { SessionService } from "./../../../../shared/services/session/session.service";
import { TaskService } from "./../../../../shared/services/task/task.service";
import { DrgsRepartitionService } from "./../../../shared/services/drgs-repartition.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs/Rx";
import { Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import * as FileSaver from "file-saver";
import { BsModalRef } from 'ngx-bootstrap';
import { DrgsTreemapDatum } from '../../services/fetch-drgs.service';

@Component({
    selector: 'packet-exporter',
    templateUrl: 'packet-exporter.component.html',
    styleUrls: ['packet-exporter.component.scss'],
})
export class PacketExporterComponent {

    private drgView: DrgView;

    constructor(
        private taskService: TaskService,
        private session: SessionService,
        private drgsRepartitionService: DrgsRepartitionService,
        private dateToMysqlDatePipe: DateToMysqlDatePipe,
        private translate: TranslateService,
    ) { }

    showModal({ tmDatum, drgView, withSupplier }: { tmDatum: DrgsTreemapDatum, drgView: DrgView, withSupplier: boolean }) {
        this.drgView = { ...drgView };
        this.packetToExport = tmDatum;
        this.exportConfirmationModal.show();
    }

    @ViewChild('exportConfirmationModal') exportConfirmationModal;
    public packetToExport;

    public export() {
        this.taskService.do(
            this.drgsRepartitionService.export(
                this.session.getLoggedUser().username,
                this.packetToExport.rawDatum.id,
                this.drgView),
            this.translate.instant('TASKS.EXPORTING'))
            .subscribe(data => {
                let fileName = `export_${this.dateToMysqlDatePipe.transform(new Date())}.csv`;
                FileSaver.saveAs(data, fileName);
                this.exportConfirmationModal.hide();
            })
    }
}
