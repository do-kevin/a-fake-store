import { Component, OnInit } from '@angular/core';

type FormType = 'tokenSale' | 'paymentKeySale';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent implements OnInit {
    formType: FormType = 'tokenSale';
    constructor() {}

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
