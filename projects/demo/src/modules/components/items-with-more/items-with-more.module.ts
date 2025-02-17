import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiGroupDirective,
    TuiHostedDropdownModule,
    TuiNotificationModule,
    TuiSvgModule,
} from '@taiga-ui/core';
import {
    TuiBadgeDirective,
    TuiCheckboxBlockModule,
    TuiItemsWithMoreModule,
    TuiTagModule,
} from '@taiga-ui/kit';

import {TuiItemsWithMoreExample1} from './examples/1';
import {TuiItemsWithMoreExample2} from './examples/2';
import {ExampleTuiItemsWithMoreComponent} from './items-with-more.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TuiGroupDirective,
        TuiTagModule,
        TuiNotificationModule,
        TuiItemsWithMoreModule,
        TuiCheckboxBlockModule,
        TuiBadgeDirective,
        TuiHostedDropdownModule,
        TuiDropdownModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiSvgModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(ExampleTuiItemsWithMoreComponent)),
    ],
    declarations: [
        ExampleTuiItemsWithMoreComponent,
        TuiItemsWithMoreExample1,
        TuiItemsWithMoreExample2,
    ],
    exports: [ExampleTuiItemsWithMoreComponent],
})
export class ExampleTuiItemsWithMoreModule {}
