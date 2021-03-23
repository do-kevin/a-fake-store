import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopComponent } from './shop.component';

@NgModule({
    declarations: [NavbarComponent, ShopComponent],
    imports: [CommonModule, RouterModule, FontAwesomeModule],
    exports: [NavbarComponent, ShopComponent],
})
export class ShopModule {}
