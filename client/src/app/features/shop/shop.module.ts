import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { CollectionComponent } from 'src/app/features/shop/components/collection/collection.component';
import { NavbarComponent } from 'src/app/features/shop/components/navbar/navbar.component';
import { ProductCardComponent } from 'src/app/features/shop/components/product-card/product-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopComponent } from './shop.component';

@NgModule({
    declarations: [
        NavbarComponent,
        ShopComponent,
        CollectionComponent,
        ProductCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        PipesModule,
        SharedModule,
    ],
    exports: [NavbarComponent, ShopComponent],
})
export class ShopModule {}
