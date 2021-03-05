import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FakeStoreApiService {
    private fakeStoreApiUrl: string = 'https://fakestoreapi.com';

    constructor(private http: HttpClient) {}

    getAllProducts() {
        return this.http.get(`${this.fakeStoreApiUrl}/products`);
    }
}
