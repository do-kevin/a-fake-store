import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
    AddItemToCart,
    RemoveItemFromCart,
} from '../store/actions/cart.actions';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
    @Input() product: any;
    addedToCart: boolean = false;

    constructor(private store: Store) {}

    ngOnInit(): void {}

    onAddToCart(product: any) {
        this.addedToCart = true;
        this.store.dispatch(new AddItemToCart(product));
    }

    removeFromCart(product: any) {
        this.addedToCart = false;
        this.store.dispatch(new RemoveItemFromCart(product));
    }
}
