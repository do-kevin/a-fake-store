import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services';
import { CartState } from 'src/app/core/states/cart.state';
import { FakeStoreState } from 'src/app/core/states/fake-store.state';
import { SalesDetailState } from 'src/app/core/states/sales-detail.state';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyFormsModule } from './forms/forms.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    declarations: [AppComponent, CheckoutComponent],
    imports: [
        CommonModule,
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
        CollapseModule.forRoot(),
        ToastrModule.forRoot(),
        CreditCardDirectivesModule,
        MyFormsModule,
        FontAwesomeModule,
        TooltipModule.forRoot(),
        AppRoutingModule,
        PipesModule,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
