import {Directive, inject, Input, OnChanges} from '@angular/core';
import {tuiAsDriver, TuiDriver} from '@taiga-ui/core/abstract';
import {BehaviorSubject} from 'rxjs';

import {TuiHintHoverDirective} from './hint-hover.directive';

@Directive({
    selector: '[tuiHint][tuiHintManual]',
    providers: [tuiAsDriver(TuiHintManualDirective)],
})
export class TuiHintManualDirective extends TuiDriver implements OnChanges {
    private readonly hover = inject(TuiHintHoverDirective);
    private readonly stream$ = new BehaviorSubject(false);

    @Input()
    tuiHintManual = false;

    readonly type = 'hint';

    constructor() {
        super(subscriber => this.stream$.subscribe(subscriber));
        this.hover.enabled = false;
    }

    ngOnChanges(): void {
        this.stream$.next(this.tuiHintManual);
    }
}
