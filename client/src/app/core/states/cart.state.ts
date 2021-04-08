import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { reject } from 'lodash-es';
import { CartStateModel } from 'src/app/core/models/cart.model';
import { Product } from 'src/app/core/models/product.model';
import { AddItemToCart, RemoveItemFromCart } from '../actions/cart.actions';

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        products: [],
        total: 0.0,
    },
})
@Injectable()
export class CartState {
    constructor(private _store: Store) {}

    @Selector()
    static showCartItems(state: CartStateModel) {
        return state.products;
    }

    @Selector()
    static showTotal(state: CartStateModel) {
        return state.total;
    }

    @Selector()
    static showNumOfItemsInCart(state: CartStateModel) {
        return Object.values(state.products).length;
    }

    @Action(AddItemToCart)
    addItemToCart(
        { getState, setState }: StateContext<CartStateModel>,
        { product }: { product: Product }
    ) {
        const state = getState();
        const items = [...state.products];
        items.push(product);

        let totalAmount = state.total;

        totalAmount = totalAmount + product.price;

        setState({
            ...state,
            products: items,
            total: totalAmount,
        });
    }

    @Action(RemoveItemFromCart)
    removeItemFromCart(
        { getState, setState }: StateContext<CartStateModel>,
        { product }: { product: Product }
    ) {
        const state = getState();

        let items = [...state.products];

        items = reject(items, { id: product.id });

        let totalAmount = state.total;

        totalAmount = totalAmount - product.price;

        setState({
            ...state,
            products: items,
            total: totalAmount,
        });
    }
}
