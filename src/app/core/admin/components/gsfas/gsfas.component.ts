import { Gsfa, GsfaService } from './../../../shared/services/gsfa.service';
import { LanguageService } from './../../../../shared/services/language/language.service';
import { TaskService } from './../../../../shared/services/task/task.service';
import { GsfaInputComponent } from './../gsfa-input/gsfa-input.component';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'gsfas',
    templateUrl: 'gsfas.component.html',
    styleUrls: ['gsfas.component.scss']
})
export class GsfasComponent {

    @Input('readonly') readonly = false;
    @Input('gsfas') selectedGsfas: Array<Gsfa> = [];
    @Output() gsfasChange = new EventEmitter();

    public labelProp = 'fr';

    constructor(
        private taskService: TaskService,
        private gsfaService: GsfaService,
        private languageService: LanguageService) {
        this.labelProp = this.languageService.getLanguage() === 'fr' ? 'frenchLabel' : 'englishLabel';
    }

    ngOnInit() {
        this.readonly = (typeof this.readonly) === 'string' ? this.readonly.toString() !== 'false' : this.readonly;
        this.taskService.do(this.gsfaService.getGsfas())
            .subscribe(gsfas => {
                this.selectedGsfas = this.selectedGsfas.map(gsfaId => gsfas.find(g => g.id === gsfaId));
                // The available Gsfas are the ones not already selected
                this.availableGsfas = gsfas.filter(g => !this.selectedGsfas.find(i => i.id === g.id))
            });
    }

    public availableGsfas: Array<Gsfa> = [];

    public onGsfasChange() {
        this.gsfasChange.emit(this.selectedGsfas);
    }

    onAddGsfa(gsfa) {
        this.selectedGsfas.push(gsfa);
        this.availableGsfas = this.availableGsfas.filter(g => g.id !== gsfa.id);
        this.onGsfasChange();
    }

    removeGsfa(gsfa) {
        this.selectedGsfas = this.selectedGsfas.filter(g => g.id !== gsfa.id);
        this.availableGsfas.push(gsfa);
        this.onGsfasChange();
    }
}
