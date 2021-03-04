import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyFormsModule } from './forms/forms.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AFakeStoreService } from './services/a-fake-store.service';
import { SalesDetailState } from './store/states/sales-detail.state';

@NgModule({
    declarations: [AppComponent, NavbarComponent, CheckoutComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([SalesDetailState], {
            developmentMode: !environment.production,
        }),
        NgxsFormPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        CreditCardDirectivesModule,
        MyFormsModule,
        FontAwesomeModule,
    ],
    providers: [AFakeStoreService],
    bootstrap: [AppComponent],
})
export class AppModule {}
