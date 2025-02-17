import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core';
import {TuiAvatarComponent} from '@taiga-ui/kit';

import {TuiPortalsExample1} from './examples/1';
import {CustomHostModule} from './examples/1/portal/custom-host.module';
import {PortalsComponent} from './portals.component';

@NgModule({
    imports: [
        CommonModule,
        CustomHostModule,
        TuiButtonModule,
        TuiAvatarComponent,
        TuiAddonDocModule,
        TuiSvgModule,
        RouterModule.forChild(tuiGenerateRoutes(PortalsComponent)),
    ],
    declarations: [PortalsComponent, TuiPortalsExample1],
    exports: [PortalsComponent],
})
export class PortalsModule {}
