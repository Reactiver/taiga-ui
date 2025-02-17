import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiButtonModule, TuiDataListModule, TuiDropdownModule} from '@taiga-ui/core';
import {TuiInitialsModule} from '@taiga-ui/experimental';
import {TuiAvatarComponent, TuiTextareaModule} from '@taiga-ui/kit';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';

import {DropdownDocumentationModule} from '../../components/abstract/dropdown-documentation/dropdown-documentation.module';
import {ExampleTuiDropdownSelectionComponent} from './dropdown-selection.component';
import {TuiDropdownSelectionExample1} from './examples/1';
import {TuiDropdownSelectionExample2} from './examples/2';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PolymorpheusModule,
        TuiDropdownModule,
        TuiButtonModule,
        TuiTextareaModule,
        TuiAvatarComponent,
        TuiDataListModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(ExampleTuiDropdownSelectionComponent)),
        DropdownDocumentationModule,
        TuiInitialsModule,
    ],
    declarations: [
        ExampleTuiDropdownSelectionComponent,
        TuiDropdownSelectionExample1,
        TuiDropdownSelectionExample2,
    ],
    exports: [ExampleTuiDropdownSelectionComponent],
})
export class ExampleTuiDropdownSelectionModule {}
