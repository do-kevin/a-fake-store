import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GetTokenSaleForm } from '../actions/sales-detail.actions';

@State({
    name: 'sales_detail',
    defaults: {
        tokenSaleForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {},
        },
    },
})
@Injectable()
export class SalesDetailState {
    constructor() {}

    @Action(GetTokenSaleForm)
    getTokenSaleForm(ctx: StateContext<any>) {
        const state = ctx.getState();

        return state.sales_detail;
    }
}
