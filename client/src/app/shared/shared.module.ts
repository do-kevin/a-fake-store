import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [CartItemComponent],
    imports: [CommonModule, FontAwesomeModule, PipesModule],
    exports: [CartItemComponent],
})
export class SharedModule {}
