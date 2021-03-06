import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
    faExclamationTriangle,
    faServer,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { setTheme } from 'ngx-bootstrap/utils';
import { AFakeStoreService } from './services/a-fake-store.service';
import { GetAllProducts } from './store/actions/fake-store.actions';

declare global {
    interface Window {
        usaepay: any;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('slideUpDown', [
            transition(':enter', [
                style({ transform: 'translateY(7rem)' }),
                animate('500ms', style({ transform: 'translateY(0)' })),
            ]),
            transition(':leave', [
                animate('500ms', style({ transform: 'translateY(7rem)' })),
            ]),
        ]),
    ],
})
export class AppComponent implements OnInit {
    isServerOnline: boolean = false;
    faServer = faServer;
    faExclamationTriangle = faExclamationTriangle;
    showServerStatus: boolean = true;

    constructor(
        private store: Store,
        private afakestoreService: AFakeStoreService
    ) {
        setTheme('bs4');
    }

    async ngOnInit() {
        this.store.dispatch(new GetAllProducts());

        this.checkServerStatus();

        setInterval(() => this.checkServerStatus(), 3601000);
    }

    async checkServerStatus() {
        this.isServerOnline = false;
        try {
            const {
                data,
            }: any = await this.afakestoreService.checkServerStatus();

            if (data) {
                this.isServerOnline = true;
            }
        } catch (err) {
            console.error('err', err);
        }
    }

    hideServerStatus() {
        this.showServerStatus = false;
    }
}
