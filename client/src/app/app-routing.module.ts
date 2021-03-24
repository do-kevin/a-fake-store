import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PaymentModule } from './payment/payment.module';
import { ShopComponent } from './shop/shop.component';
import { ShopModule } from './shop/shop.module';

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
    },
    {
        path: 'payment',
        component: PaymentComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        ShopModule,
        PaymentModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
