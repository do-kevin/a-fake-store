import { Component } from '@angular/core';
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { RemoveItemFromCart } from '../store/actions/cart.actions';
import { CartState } from '../store/states/cart.state';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
})
export class ShopComponent {
    @Select(CartState.showCartItems) items$: any;
    @Select(CartState.showTotal) totalAmount$: any;
    isCollapsed: boolean;
    total: any;
    faTimes = faTimes;
    faTrashAlt = faTrashAlt;

    constructor(private store: Store) {
        this.isCollapsed = false;
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
        });
    }

    openCart = () => {
        this.isCollapsed = true;
    };

    removeFromCart(product: any) {
        this.store.dispatch(new RemoveItemFromCart(product));
    }
}
