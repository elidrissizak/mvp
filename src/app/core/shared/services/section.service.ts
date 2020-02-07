import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const SECTIONS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'icon-dashboard' },
    { id: 'bim-assistant', label: 'Assistant BIM', icon: 'icon-bim-assistant' },
    //{ id: 'admin', label: 'Administrator', icon: 'icon-administrator' }
]

@Injectable()
export class SectionService {

    private currentSection = 'dashboard';
    private params: any;

    constructor(private router: Router) { }

    goTo(sectionName, params = undefined) {
        this.currentSection = sectionName;
        this.params = params;
        return this.router.navigate(['/core/' + sectionName]);
    }

    getCurrentSection() {
        return this.router.url.split('/')[2];
    }

    getCurrentParams() {
        return this.params;
    }
}
