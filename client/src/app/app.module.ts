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
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyFormsModule } from './forms/forms.module';
import { AFakeStoreService } from './services/a-fake-store.service';
import { CartState } from './store/states/cart.state';
import { FakeStoreState } from './store/states/fake-store.state';
import { SalesDetailState } from './store/states/sales-detail.state';

@NgModule({
    declarations: [
        AppComponent,
        // CollectionComponent,
        CheckoutComponent,
        // ProductCardComponent,
        // ReplaceAFakeStoreApiUrlPipe,
    ],
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
        CarouselModule.forRoot(),
        ToastrModule.forRoot(),
        CreditCardDirectivesModule,
        MyFormsModule,
        FontAwesomeModule,
        TooltipModule.forRoot(),
        AppRoutingModule,
    ],
    providers: [AFakeStoreService],
    bootstrap: [AppComponent],
})
export class AppModule {}
