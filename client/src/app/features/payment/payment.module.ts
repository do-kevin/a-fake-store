import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { PaymentKeySaleFormComponent } from 'src/app/features/payment/components/payment-key-sale-form/payment-key-sale-form.component';
import { TokenSaleFormComponent } from 'src/app/features/payment/components/token-sale-form/token-sale-form.component';
import { PaymentDetailsComponent } from 'src/app/features/payment/payment-details/payment-details.component';
import { PaymentComponent } from 'src/app/features/payment/payment.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        PaymentDetailsComponent,
        PaymentComponent,
        TokenSaleFormComponent,
        PaymentKeySaleFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsFormPluginModule,
        CreditCardDirectivesModule,
        SharedModule,
    ],
    exports: [
        PaymentDetailsComponent,
        TokenSaleFormComponent,
        PaymentKeySaleFormComponent,
    ],
})
export class PaymentModule {}
