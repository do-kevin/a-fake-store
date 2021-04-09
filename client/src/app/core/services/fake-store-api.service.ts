import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { FAKE_STORE_API_URL } = environment;

@Injectable({
    providedIn: 'root',
})
export class FakeStoreApiService {
    private fakeStoreApiUrl: string;

    constructor(private http: HttpClient) {
        this.fakeStoreApiUrl = FAKE_STORE_API_URL;
    }

    getAllProducts() {
        return this.http.get(`${this.fakeStoreApiUrl}/products`);
    }
}
