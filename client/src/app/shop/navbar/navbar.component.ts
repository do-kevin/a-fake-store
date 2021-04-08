import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Select } from '@ngxs/store';
import { CartState } from 'src/app/core/states/cart.state';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    @HostBinding('class') classes =
        'navbar navbar-light border-bottom px-4 bg-white position-fixed w-100';
    @HostBinding('style') style = 'z-index: 2; top: 0';
    @Input() openCart: () => void = () => {};
    @Select(CartState.showNumOfItemsInCart)
    numOfItemsInCart$: any;
    numOfItemsInCart: number = 0;
    faShoppingCart = faShoppingCart;

    constructor() {
        this.numOfItemsInCart$.subscribe(
            (result: any) => (this.numOfItemsInCart = result)
        );
    }

    ngOnInit(): void {}
}
