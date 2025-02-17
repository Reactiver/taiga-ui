import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiAmountPipe} from '@taiga-ui/addon-commerce';
import {TuiButtonModule, TuiModeModule} from '@taiga-ui/core';
import {TuiSelectModule} from '@taiga-ui/kit';

import {AlertExampleComponent} from './alert-example.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TuiButtonModule,
        TuiModeModule,
        TuiSelectModule,
        TuiAmountPipe,
    ],
    declarations: [AlertExampleComponent],
    exports: [AlertExampleComponent],
})
export class AlertExampleModule {}
