import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CartState } from '../store/states/cart.state';
import { FakeStoreState } from '../store/states/fake-store.state';
@Component({
    selector: 'app-shopping-wheel',
    templateUrl: './shopping-wheel.component.html',
})
export class ShoppingWheelComponent implements OnInit {
    @Select(FakeStoreState.showProducts) products$: any;
    @Select(CartState.showTotal) totalAmount$: any;
    total: any;
    length: number = 0;

    constructor() {
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
            return result;
        });
    }

    ngOnInit(): void {
        this.products$.subscribe((data: any[]) => {
            this.length = data.length;
        });
    }
}
