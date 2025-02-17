import {Directive, inject, Output} from '@angular/core';
import {TuiPanService} from '@taiga-ui/cdk/services';

@Directive({
    selector: '[tuiPan]',
    providers: [TuiPanService],
})
export class TuiPanDirective {
    @Output()
    readonly tuiPan = inject(TuiPanService);
}
