import { ConfigService } from './../../shared/services/config/config.service';
import { Router } from '@angular/router';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent { }
