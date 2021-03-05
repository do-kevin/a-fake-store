import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { setTheme } from 'ngx-bootstrap/utils';
import { GetAllProducts } from './store/actions/fake-store.actions';

declare global {
    interface Window {
        usaepay: any;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private store: Store) {
        setTheme('bs4');
    }

    ngOnInit() {
        this.store.dispatch(new GetAllProducts());
    }
}
