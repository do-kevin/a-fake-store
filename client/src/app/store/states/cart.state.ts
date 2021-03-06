import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { reject } from 'lodash';
import { AddItemToCart, RemoveItemFromCart } from '../actions/cart.actions';
import { Product } from './fake-store.state';

export interface CartStateModel {
    products: Product[];
    total: number;
}

@State<CartStateModel>({
    name: 'cart',
    defaults: {
        products: [],
        total: 0.0,
    },
})
@Injectable()
export class CartState {
    constructor(private store: Store) {}

    @Selector()
    static showTotal(state: CartStateModel) {
        return state.total;
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
