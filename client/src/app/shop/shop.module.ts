import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReplaceAFakeStoreApiUrlPipe } from '../pipes/replace-afake-store-api-url.pipe';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CollectionComponent } from './collection/collection.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopComponent } from './shop.component';

@NgModule({
    declarations: [
        NavbarComponent,
        ShopComponent,
        CollectionComponent,
        ProductCardComponent,
        ReplaceAFakeStoreApiUrlPipe,
    ],
    imports: [CommonModule, RouterModule, FontAwesomeModule],
    exports: [NavbarComponent, ShopComponent],
})
export class ShopModule {}
