import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { keyBy } from 'lodash-es';
import { tap } from 'rxjs/operators';
import { FakeStoreApiService } from 'src/app/core/services/fake-store-api.service';
import { GetAllProducts } from '../actions/fake-store.actions';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface FakeStoreStateModel {
    products: {
        entities: any;
        count: number;
    };
}

@State<FakeStoreStateModel>({
    name: 'fake_store',
    defaults: {
        products: {
            entities: {},
            count: 0,
        },
    },
})
@Injectable()
export class FakeStoreState {
    constructor(private fakeStoreApi: FakeStoreApiService) {}

    @Selector()
    static showProducts(state: FakeStoreStateModel) {
        return Object.values(state.products.entities);
    }

    @Action(GetAllProducts)
    getAllProducts({ getState, setState }: StateContext<FakeStoreStateModel>) {
        return this.fakeStoreApi.getAllProducts().pipe(
            tap((result: any) => {
                const state = getState();
                setState({
                    ...state,
                    products: {
                        entities: keyBy(result, 'id'),
                        count: result.length,
                    },
                });
            })
        );
    }
}
