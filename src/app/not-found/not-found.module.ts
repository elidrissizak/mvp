import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NgModule } from '@angular/core';
import { ROUTES } from './not-found.routes';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [
    ]
})
export class NotFoundModule { }
