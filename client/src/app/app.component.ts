import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

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
    constructor() {
        setTheme('bs4');
    }

    ngOnInit() {}
}
