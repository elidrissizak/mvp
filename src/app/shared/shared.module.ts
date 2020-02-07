import { IconComponent } from './components/icon/icon.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Injectable, NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ConfigService } from './services/config/config.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedServicesModule } from './services/shared-services.module';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RestService } from "./services/network/rest.service";
import { NgPipesModule } from 'ngx-pipes';
import { EntitiesModule } from './entities/entities.module';


export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
        NgPipesModule,
    ],
    declarations: [
        SpinnerComponent,
        IconComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        SharedServicesModule,
        EntitiesModule,
        TranslateModule,
        SpinnerComponent,
        IconComponent,
        NgPipesModule,
    ],
    providers: [
        CurrencyPipe // but why ???
        // Should be empty, because shared services
        // are located in the ./services/shared-service.module.ts
    ]
})
export class SharedModule { }
