import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { setTheme } from 'ngx-bootstrap/utils';
import { GetAllProducts } from 'src/app/core/actions/fake-store.actions';
import { ApiService } from './core/services';

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
    @HostBinding('class') classes = 'd-block w-100 h-100 bg-light';
    isServerOnline: boolean = false;
    showServerStatus: boolean = true;

    constructor(private store: Store, private api: ApiService) {
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
            const { data }: any = await this.api.checkServerStatus();

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
