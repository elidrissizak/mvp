import { SectionService, SECTIONS } from './shared/services/section.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';
@Component({
    selector: 'core-side',
    templateUrl: 'core-side.component.html',
    styleUrls: ['core-side.component.scss']
})
export class CoreSideComponent {

    @Input('closed') closed: boolean;
    @Output('close') closeEvent = new EventEmitter();

    constructor(public sectionService: SectionService) { }

    public sections = SECTIONS;

    public activeSection = this.sections[0];

    close() {
        this.closeEvent.emit();
    }

    isActive(sectionId: string) {
        return this.sectionService.getCurrentSection() === sectionId;
    }

    goTo(section) {
        this.sectionService.goTo(section.id);
        this.close();
    }

    goToOldRrf() {
        window.location.href = "http://rrf.intra.renault.fr/rrf/index.jsp";
    }
}
