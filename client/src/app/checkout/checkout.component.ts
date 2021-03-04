import { Component, OnInit } from '@angular/core';

type FormType = 'tokenSale' | 'paymentKeySale';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
    formType: FormType = 'tokenSale';
    constructor() {}

    ngOnInit(): void {}

    togglePaymentForms() {
        console.log('type', this.formType);
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
