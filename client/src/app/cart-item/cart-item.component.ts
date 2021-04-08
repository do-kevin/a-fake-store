import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RemoveItemFromCart } from 'src/app/core/actions/cart.actions';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
})
export class CartItemComponent implements OnInit {
    @HostBinding('class') classes = 'row mx-0 rounded mb-3';
    @Input() product: any;
    @Input() canRemoveItem: boolean;

    constructor(private store: Store) {
        this.canRemoveItem = true;
    }

    ngOnInit(): void {}

    removeFromCart(product: any) {
        this.store.dispatch(new RemoveItemFromCart(product));
    }
}
