import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CreditCardValidators } from 'angular-cc-library';
import { ToastrService } from 'ngx-toastr';
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
        private afakestoreService: AFakeStoreService,
        private toastr: ToastrService
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

        let status = 'INVALID';

        this.store
            .dispatch(new GetTokenSaleForm())
            .subscribe(({ sales_detail }) => {
                const { tokenSaleForm } = sales_detail;
                status = tokenSaleForm.status;

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

                if (status === 'VALID') {
                    tokenizationBody = {
                        cardholder: cardholderName,
                        number: cardNumber.replace(/\s+/g, ''),
                        expiration: expirationMonth + expirationYear,
                        cvc: securityCode,
                        avs_street: streetAddress,
                        avs_postalcode: zipCode,
                        amount: transactionAmount,
                    };
                }
            });

        if (status === 'INVALID') {
            this.toastr.error('Form has been filled incorrectly');
            return;
        }

        try {
            const { data } = (await this.afakestoreService.processTokenSale(
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
    }
}
