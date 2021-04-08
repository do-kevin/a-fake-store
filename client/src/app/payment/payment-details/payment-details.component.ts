import { Component, HostBinding, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CartState } from 'src/app/core/states/cart.state';

type FormType = 'tokenSale' | 'paymentKeySale';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
})
export class PaymentDetailsComponent implements OnInit {
    @HostBinding('class') classes = 'row mx-0 h-100';
    @Select(CartState.showCartItems) items$: any;
    @Select(CartState.showTotal) totalAmount$: any;
    total: any;
    formType: FormType = 'tokenSale';

    constructor() {
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
        });
    }

    ngOnInit(): void {}

    togglePaymentForms() {
        if (this.formType === 'paymentKeySale') {
            this.formType = 'tokenSale';
        } else {
            this.formType = 'paymentKeySale';
        }
    }

    setPaymentKeySaleForm() {
        this.formType = 'paymentKeySale';
    }

    setTokenSaleForm() {
        this.formType = 'tokenSale';
    }
}
