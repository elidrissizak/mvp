import { ConfigService } from './shared/services/config/config.service';
import { NotFoundModule } from './not-found/not-found.module';
import { ForbiddenModule } from './forbidden/forbidden.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, OpaqueToken, Inject, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { OAuthModule } from 'angular-oauth2-oidc';
import { IdpAuthorizedModule } from "./idp-authorized/idp.authorized.module";

/**
 * When Angular will need the APP_INITIALIZER provider (see below),
 * it will instantiate all the linked injectables (because APP_INITIALIZER
 * is a multi token).  One of these injectables is the one we added ourselve through
 * this factory. Its job is to give a service (function) which will load the
 * config file (/assets/config.json). Loading is done by ConfigService.load.
 */
export function configLoaderFactory(config: ConfigService) {
    return () => {
        return config.load('/assets/configs/config.json');
    };
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        NotFoundModule,
        ForbiddenModule,
        IdpAuthorizedModule,
        CoreModule,
        OAuthModule.forRoot(),
    ],
    providers: [
        {
            // APP_INITIALIZER is a built-in DI token
            provide: APP_INITIALIZER,
            // By setting multi as true we add some behavior to this token.
            // The multi will inject an array of providers, including our one.
            multi: true,
            // Which will "point" to the service given by the configServiceFactory
            useFactory: configLoaderFactory,
            // This factory needs ConfigService as dependency
            deps: [ConfigService],
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
