import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services';
import { environment } from '../../../environments/environment';
import { CartState } from '../../store/states/cart.state';

@Component({
    selector: 'app-payment-key-sale-form',
    templateUrl: './payment-key-sale-form.component.html',
})
export class PaymentKeySaleFormComponent implements OnInit {
    @Select(CartState.showTotal) totalAmount$: any;
    total: any;

    constructor(private apiService: ApiService, private toastr: ToastrService) {
        this.totalAmount$.subscribe((result: any) => {
            this.total = result;
            return result;
        });
    }

    ngOnInit(): void {
        let client = new window.usaepay.Client(
            environment.USAEPAY_PUBLIC_API_KEY
        );

        let paymentCard = client.createPaymentCardEntry();
        paymentCard.addHTML('paymentCardContainer');
        paymentCard.generateHTML({});
        paymentCard.addHTML('paymentCardContainer');

        paymentCard.addEventListener('error', (errorMessage: string) => {
            let errorContainer = document.getElementById(
                'paymentCardErrorContainer'
            ) as HTMLDivElement;
            errorContainer.textContent = errorMessage;

            if (errorMessage) {
                this.toastr.error(errorMessage);
            }
        });

        const form = document.getElementById('paymentForm') as HTMLFormElement;

        form.addEventListener('submit', (event: Event) => {
            event.preventDefault();

            client.getPaymentKey(paymentCard).then((result: any) => {
                if (result.error) {
                    const errorContainer = document.getElementById(
                        'paymentCardErrorContainer'
                    ) as HTMLDivElement;
                    errorContainer.textContent = result.error.message;
                    this.toastr.error(result.error.message);
                } else {
                    this.tokenHandler(result);
                }
            });
        });
    }

    async tokenHandler(token: string) {
        const transactionAmount = formatCurrency(this.total, 'en', '');

        try {
            const { data } = (await this.apiService.processPaymentKeySale({
                payment_key: token,
                amount: transactionAmount,
            })) as any;

            const { result_code, refnum } = data;

            if (result_code === 'A') {
                this.toastr.success(
                    `Success: Your payment has been approved. Your reference number is #${refnum}`
                );
            }
        } catch (err) {
            console.error(err);
            if (err.error.data) {
                const { error_code, error } = err.error.data;
                this.toastr.error(`Error ${error_code}: ${error}`);
            }
        }

        var form = document.getElementById('paymentForm') as HTMLFormElement;
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'payment_key');
        hiddenInput.setAttribute('value', token);

        form.appendChild(hiddenInput);
    }
}
