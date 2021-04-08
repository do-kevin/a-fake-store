import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CreditCardValidators } from 'angular-cc-library';
import { ToastrService } from 'ngx-toastr';
import { GetTokenSaleForm } from 'src/app/core/actions/sales-detail.actions';
import { MONTH_OPTIONS } from 'src/app/core/constants/month-options';
import { ApiService } from 'src/app/core/services';
import { CartState } from 'src/app/core/states/cart.state';

@Component({
    selector: 'app-token-sale-form',
    templateUrl: './token-sale-form.component.html',
})
export class TokenSaleFormComponent implements OnInit {
    @Select(CartState.showTotal) totalAmount$: any;
    total: any;
    isSubmitting: boolean = false;

    months = MONTH_OPTIONS;
    years = [] as any[];

    tokenSaleForm = new FormGroup({
        cardNumber: new FormControl(null, {
            validators: [
                Validators.required,
                Validators.minLength(13),
                Validators.maxLength(19),
                CreditCardValidators.validateCCNumber,
            ],
        }),
        cardholderName: new FormControl(null, [
            Validators.required,
            Validators.minLength(1),
        ]),
        securityCode: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
        ]),
        expirationMonth: new FormControl(null, [Validators.required]),
        expirationYear: new FormControl(null, [Validators.required]),
        streetAddress: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
        ]),
        zipCode: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(9),
        ]),
    });

    constructor(
        private store: Store,
        private apiService: ApiService,
        private toastr: ToastrService
    ) {
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
            return result;
        });
    }

    ngOnInit(): void {
        this.populateYearOptions();
    }

    populateYearOptions() {
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
        this.isSubmitting = true;

        if (this.tokenSaleForm.status === 'VALID') {
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

                    if (securityCode.length < 3) {
                        this.toastr.error('Security code is required');
                    }

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
                const { data } = (await this.apiService.processTokenSale(
                    tokenizationBody
                )) as any;

                const { result_code, refnum } = data;

                if (result_code === 'A') {
                    this.toastr.success(
                        `Success: Your payment has been approved. Your reference number is #${refnum}`
                    );
                }
            } catch (err) {
                console.error(err);

                if (!err.error.data) {
                    this.toastr.error(err.statusText);
                }

                const { error_code, error } = err.error.data;

                this.toastr.error(`Error ${error_code}: ${error}`);
            }
        } else {
            this.toastr.error(
                'Your credit card information has been filled incorrectly'
            );
        }
    }

    get cardNumber() {
        return this.tokenSaleForm.get('cardNumber');
    }

    get cardholderName() {
        return this.tokenSaleForm.get('cardholderName');
    }

    get expirationMonth() {
        return this.tokenSaleForm.get('expirationMonth');
    }

    get expirationYear() {
        return this.tokenSaleForm.get('expirationYear');
    }

    get securityCode() {
        return this.tokenSaleForm.get('securityCode');
    }

    get streetAddress() {
        return this.tokenSaleForm.get('streetAddress');
    }

    get zipCode() {
        return this.tokenSaleForm.get('zipCode');
    }
}
