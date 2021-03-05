import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    faShoppingCart = faShoppingCart;
    constructor() {}

    ngOnInit(): void {}
}
