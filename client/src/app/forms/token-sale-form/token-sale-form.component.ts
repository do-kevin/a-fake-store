import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CreditCardValidators } from 'angular-cc-library';
import { MONTH_OPTIONS } from '../../const/input';
import { AFakeStoreService } from '../../services/a-fake-store.service';
import { GetTokenSaleForm } from '../../store/actions/sales-detail.actions';
import { CartState } from '../../store/states/cart.state';

@Component({
    selector: 'app-token-sale-form',
    templateUrl: './token-sale-form.component.html',
})
export class TokenSaleFormComponent implements OnInit {
    @Select(CartState.showTotal) totalAmount$: any;
    total: any;

    months = MONTH_OPTIONS;
    years = [] as any[];

    tokenSaleForm = new FormGroup({
        cardNumber: new FormControl('', [
            Validators.required,
            CreditCardValidators.validateCCNumber,
        ]),
        cardholderName: new FormControl(),
        securityCode: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
        ]),
        expirationMonth: new FormControl(null, [Validators.required]),
        expirationYear: new FormControl(null, [Validators.required]),
        streetAddress: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required]),
    });

    constructor(
        private store: Store,
        private afakestoreService: AFakeStoreService
    ) {
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
            return result;
        });
    }

    ngOnInit(): void {
        const year = new Date().getFullYear();
        let yearNum = null;
        for (let i = 0; i < 12; i++) {
            yearNum = Number(year) + i;
            yearNum = yearNum.toString();
            this.years.push({
                text: yearNum,
                value: yearNum.slice(-2),
            });
            yearNum = null;
        }
    }

    async onPay(event: Event) {
        event.preventDefault();

        let tokenizationBody = {};

        const transactionAmount = formatCurrency(this.total, 'en', '');

        this.store
            .dispatch(new GetTokenSaleForm())
            .subscribe(({ sales_detail }) => {
                const { tokenSaleForm } = sales_detail;
                const {
                    cardNumber,
                    cardholderName,
                    expirationMonth,
                    expirationYear,
                    securityCode,
                    streetAddress,
                    zipCode,
                } = tokenSaleForm.model;

                tokenizationBody = {
                    cardholder: cardholderName,
                    number: cardNumber.replace(/\s+/g, ''),
                    expiration: expirationMonth + expirationYear,
                    cvc: securityCode,
                    avs_street: streetAddress,
                    avs_postalcode: zipCode,
                    amount: transactionAmount,
                };
            });

        try {
            const response = await this.afakestoreService.processTokenSale(
                tokenizationBody
            );
        } catch (err) {
            console.error(err);
        }
    }
}
