import { Product } from '../states/fake-store.state';

export class AddItemToCart {
    static readonly type = '[Checkout Screen] AddItemToCart';
    constructor(public product: Product) {}
}

export class RemoveItemFromCart {
    static readonly type = '[Checkout Screen] RemoveItemFromCart';
    constructor(public product: Product) {}
}
