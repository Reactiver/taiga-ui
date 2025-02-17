import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiPopover} from '@taiga-ui/cdk';
import {TuiPdfViewerOptions} from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

import type {Buttons} from './index';

@Component({
    selector: 'tui-actions-content',
    templateUrl: './actions-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsContentComponent {
    readonly context =
        inject<TuiPopover<TuiPdfViewerOptions<Buttons>, string>>(POLYMORPHEUS_CONTEXT);
}
