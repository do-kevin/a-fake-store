import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AFakeStoreService } from '../../services/a-fake-store.service';

@Component({
    selector: 'app-payment-key-sale-form',
    templateUrl: './payment-key-sale-form.component.html',
})
export class PaymentKeySaleFormComponent implements OnInit {
    constructor(private afakestoreService: AFakeStoreService) {}

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
                    console.log('result', result);
                    this.tokenHandler(result);
                }
            });
        });

        console.log('client', client);
        console.log('paymentCard', paymentCard);
    }

    async tokenHandler(token: string) {
        const response = await this.afakestoreService.processPaymentKeySale({
            payment_key: token,
            amount: '17.00',
        });

        console.log('response', response);

        var form = document.getElementById('paymentForm') as HTMLFormElement;
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'payment_key');
        hiddenInput.setAttribute('value', token);

        form.appendChild(hiddenInput);
    }
}
