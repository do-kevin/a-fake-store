import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ShopModule } from './shop/shop.module';

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes), ShopModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
