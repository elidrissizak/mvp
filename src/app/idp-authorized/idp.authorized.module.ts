import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IdpAuthorizedComponent } from "./idp.authorized.component";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        IdpAuthorizedComponent
    ],
    exports: [
    ]
})
export class IdpAuthorizedModule { }
