import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PipesModule } from '../pipes/pipes.module';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharedModule } from '../shared/shared.module';
import { CollectionComponent } from './collection/collection.component';
import { NavbarComponent } from './navbar/navbar.component';
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
        SharedModule
    ],
    exports: [NavbarComponent, ShopComponent],
})
export class ShopModule {}
