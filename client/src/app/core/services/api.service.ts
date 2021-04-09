import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { production, SERVER_API_URL } = environment;

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl: string = 'http://localhost:8000';

    constructor(private http: HttpClient) {
        if (production) {
            this.baseUrl = SERVER_API_URL;

            if (
                SERVER_API_URL === 'undefined' ||
                !SERVER_API_URL ||
                !SERVER_API_URL.length
            ) {
                this.baseUrl = 'http://localhost:8000';
            }
        }

        if (!production) {
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

    async checkServerStatus() {
        return this.http.get(`${this.baseUrl}/is_online`, {}).toPromise();
    }
}
