import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CoreModule } from 'src/app/core/core.module';
import { ApiService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, AppRoutingModule, SharedModule, CoreModule],
    providers: [ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {}
