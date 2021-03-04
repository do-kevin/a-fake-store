import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AFakeStoreService {
    private baseUrl: string = 'http://localhost:8000';

    constructor(private http: HttpClient) {
        if (environment.SERVER_API_URL) {
            this.baseUrl = environment.SERVER_API_URL;
        }

        if (
            environment.SERVER_API_URL === 'undefined' ||
            !environment.SERVER_API_URL
        ) {
            this.baseUrl = 'http://localhost:8000';
        }
    }

    async processTokenSale(body: any) {
        return this.http
            .post(
                `${this.baseUrl}/api/usaepay/process_token_sale`,
                {
                    ...body,
                },
                {}
            )
            .toPromise();
    }

    async processPaymentKeySale(postData: any) {
        return this.http
            .post(
                `${this.baseUrl}/api/usaepay/process_payment_key_sale`,
                postData,
                {}
            )
            .toPromise();
    }
}
