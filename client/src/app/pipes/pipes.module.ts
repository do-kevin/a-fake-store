import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReplaceAFakeStoreApiUrlPipe } from './replace-afake-store-api-url.pipe';

@NgModule({
    declarations: [ReplaceAFakeStoreApiUrlPipe],
    imports: [CommonModule],
    exports: [ReplaceAFakeStoreApiUrlPipe],
})
export class PipesModule {}
