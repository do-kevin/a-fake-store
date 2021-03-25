import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CartState } from 'src/app/store/states/cart.state';
import { FakeStoreState } from 'src/app/store/states/fake-store.state';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
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
