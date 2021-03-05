import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import { AFakeStoreService } from '../../services/a-fake-store.service';
import { CartState } from '../../store/states/cart.state';

@Component({
    selector: 'app-payment-key-sale-form',
    templateUrl: './payment-key-sale-form.component.html',
})
export class PaymentKeySaleFormComponent implements OnInit {
    @Select(CartState.showTotal) totalAmount$: any;
    total: any;

    constructor(private afakestoreService: AFakeStoreService) {
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
        });

        let form = document.getElementById('paymentForm') as HTMLFormElement;

        form.addEventListener('submit', (event: Event) => {
            event.preventDefault();

            client.getPaymentKey(paymentCard).then((result: any) => {
                if (result.error) {
                    let errorContainer = document.getElementById(
                        'paymentCardErrorContainer'
                    ) as any;
                    errorContainer.textContent = result.error.message;
                } else {
                    this.tokenHandler(result);
                }
            });
        });
    }

    async tokenHandler(token: string) {
        const transactionAmount = formatCurrency(this.total, 'en', '');

        try {
            const response = await this.afakestoreService.processPaymentKeySale(
                {
                    payment_key: token,
                    amount: transactionAmount,
                }
            );
        } catch (err) {
            console.error(err);
        }

        var form = document.getElementById('paymentForm') as HTMLFormElement;
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'payment_key');
        hiddenInput.setAttribute('value', token);

        form.appendChild(hiddenInput);
    }
}
