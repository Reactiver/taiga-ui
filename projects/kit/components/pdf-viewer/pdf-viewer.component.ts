import {ChangeDetectionStrategy, Component, HostListener, inject} from '@angular/core';
import {TuiPopover} from '@taiga-ui/cdk';
import {
    TUI_ANIMATIONS_SPEED,
    TUI_CLOSE_WORD,
    TUI_COMMON_ICONS,
    tuiFadeIn,
    tuiSlideInTop,
    tuiToAnimationOptions,
} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

import {TuiPdfViewerOptions} from './pdf-viewer.options';

@Component({
    selector: 'tui-pdf-viewer',
    templateUrl: './pdf-viewer.template.html',
    styleUrls: ['./pdf-viewer.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiSlideInTop, tuiFadeIn],
    host: {
        '[@tuiFadeIn]': 'options',
        '[@tuiSlideInTop]': 'options',
    },
})
export class TuiPdfViewerComponent<I, O> {
    readonly options = tuiToAnimationOptions(inject(TUI_ANIMATIONS_SPEED));
    readonly closeWord$ = inject(TUI_CLOSE_WORD);
    readonly icons = inject(TUI_COMMON_ICONS);
    readonly context =
        inject<TuiPopover<TuiPdfViewerOptions<I>, O>>(POLYMORPHEUS_CONTEXT);

    @HostListener('document:keydown.esc')
    onKeyDownEsc(): void {
        this.context.$implicit.complete();
    }
}
