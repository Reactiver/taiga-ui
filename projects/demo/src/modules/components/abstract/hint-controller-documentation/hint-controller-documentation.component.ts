import {Component, inject} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';

import {AbstractExampleTuiControl} from '../control';
import {ABSTRACT_PROPS_ACCESSOR} from '../inherited-documentation/abstract-props-accessor';

@Component({
    selector: 'hint-controller-documentation',
    templateUrl: './hint-controller-documentation.template.html',
    changeDetection,
})
export class HintControllerDocumentationComponent {
    readonly documentedComponent = inject<AbstractExampleTuiControl>(
        ABSTRACT_PROPS_ACCESSOR,
    );
}
