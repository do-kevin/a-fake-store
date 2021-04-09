import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ToastrModule } from 'ngx-toastr';
import { CartState } from 'src/app/core/states/cart.state';
import { FakeStoreState } from 'src/app/core/states/fake-store.state';
import { SalesDetailState } from 'src/app/core/states/sales-detail.state';
import { environment } from 'src/environments/environment';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PipesModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([SalesDetailState, FakeStoreState, CartState], {
            developmentMode: !environment.production,
        }),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        ToastrModule.forRoot(),
        CreditCardDirectivesModule,
    ],
    exports: [PipesModule],
})
export class CoreModule {}
