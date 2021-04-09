import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { keyBy } from 'lodash-es';
import { tap } from 'rxjs/operators';
import { FakeStoreStateModel } from 'src/app/core/models/fake-store.model';
import { FakeStoreApiService } from 'src/app/core/services/fake-store-api.service';
import { GetAllProducts } from '../actions/fake-store.actions';

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
