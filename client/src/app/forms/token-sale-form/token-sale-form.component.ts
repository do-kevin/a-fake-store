import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreditCardValidators } from 'angular-cc-library';
import { MONTH_OPTIONS } from '../../const/input';
import { AFakeStoreService } from '../../services/a-fake-store.service';
import { GetTokenSaleForm } from '../../store/actions/sales-detail.actions';

@Component({
    selector: 'app-token-sale-form',
    templateUrl: './token-sale-form.component.html',
})
export class TokenSaleFormComponent implements OnInit {
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
    ) {}

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
                };
            });

        console.log('body', tokenizationBody);

        const response = await this.afakestoreService.processTokenSale(
            tokenizationBody
        );

        console.log('res', response);
    }
}
