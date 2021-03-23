import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Select } from '@ngxs/store';
import { CartState } from 'src/app/store/states/cart.state';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
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
