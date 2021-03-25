import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyFormsModule } from '../forms/forms.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentComponent } from './payment.component';

@NgModule({
    declarations: [PaymentDetailsComponent, PaymentComponent],
    imports: [CommonModule, MyFormsModule, SharedModule],
    exports: [PaymentDetailsComponent],
})
export class PaymentModule {}
