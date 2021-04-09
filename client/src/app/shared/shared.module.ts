import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FaIconLibrary,
    FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
    faExclamationTriangle,
    faServer,
    faShoppingCart,
    faTimes,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { CartItemComponent } from 'src/app/shared/components/cart-item/cart-item.component';
import { BootstrapModule } from './bootstrap.module';

@NgModule({
    declarations: [CartItemComponent],
    imports: [CommonModule, FontAwesomeModule, PipesModule, BootstrapModule],
    exports: [
        BootstrapModule,
        CartItemComponent,
        FontAwesomeModule,
        PipesModule,
    ],
})
export class SharedModule {
    constructor(private faIconLibrary: FaIconLibrary) {
        this.faIconLibrary.addIcons(
            faExclamationTriangle,
            faServer,
            faTrashAlt,
            faTimes,
            faShoppingCart
        );
    }
}
