import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [CollapseModule.forRoot(), TooltipModule.forRoot()],
    exports: [CollapseModule, TooltipModule],
})
export class BootstrapModule {}
