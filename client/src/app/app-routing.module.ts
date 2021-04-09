import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from 'src/app/features/payment/payment.component';
import { PaymentModule } from 'src/app/features/payment/payment.module';
import { ShopComponent } from 'src/app/features/shop/shop.component';
import { ShopModule } from 'src/app/features/shop/shop.module';

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
    },
    {
        path: 'payment-details',
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
