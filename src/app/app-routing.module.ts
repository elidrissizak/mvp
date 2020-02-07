import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdpAuthorizedComponent } from "./idp-authorized/idp.authorized.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '404', component: NotFoundComponent },
            { path: 'forbidden', component: ForbiddenComponent },
            { path: 'authorized', component: IdpAuthorizedComponent },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
