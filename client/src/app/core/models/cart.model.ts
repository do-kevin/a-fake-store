import { Product } from 'src/app/core/models/product.model';

export interface CartStateModel {
    products: Product[];
    total: number;
}
