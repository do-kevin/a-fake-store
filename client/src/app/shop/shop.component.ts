import { Component } from '@angular/core';
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { RemoveItemFromCart } from 'src/app/core/actions/cart.actions';
import { CartState } from 'src/app/core/states/cart.state';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
})
export class ShopComponent {
    @Select(CartState.showCartItems) items$: any;
    @Select(CartState.showTotal) totalAmount$: any;
    @Select(CartState.showNumOfItemsInCart) numOfItemsInCart$: any;
    isCollapsed: boolean;
    total: any;
    faTimes = faTimes;
    faTrashAlt = faTrashAlt;
    numOfCartItems: number = 0;

    constructor(private store: Store) {
        this.isCollapsed = false;
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
        });
        this.numOfItemsInCart$.subscribe(
            (result: any) => (this.numOfCartItems = result)
        );
    }

    openCart = () => {
        this.isCollapsed = true;
    };

    removeFromCart(product: any) {
        this.store.dispatch(new RemoveItemFromCart(product));
    }
}
