import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { PaymentKeySaleFormComponent } from './payment-key-sale-form/payment-key-sale-form.component';
import { TokenSaleFormComponent } from './token-sale-form/token-sale-form.component';

@NgModule({
    declarations: [TokenSaleFormComponent, PaymentKeySaleFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsFormPluginModule,
        CreditCardDirectivesModule,
    ],
    exports: [TokenSaleFormComponent, PaymentKeySaleFormComponent],
})
export class MyFormsModule {}
