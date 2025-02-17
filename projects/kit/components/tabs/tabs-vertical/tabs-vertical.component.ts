import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    inject,
    Input,
} from '@angular/core';
import {TuiHorizontalDirection} from '@taiga-ui/core';

import {TuiTabsDirective} from '../tabs.directive';

@Component({
    selector: 'tui-tabs[vertical], nav[tuiTabs][vertical]',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./tabs-vertical.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiTabsVerticalComponent {
    private readonly tabs = inject(TuiTabsDirective);

    @Input()
    @HostBinding('attr.data-vertical')
    vertical: TuiHorizontalDirection = 'left';

    @HostListener('keydown.arrowDown.prevent', ['$event.target', '1'])
    @HostListener('keydown.arrowUp.prevent', ['$event.target', '-1'])
    onKeyDownArrow(current: HTMLElement, step: number): void {
        this.tabs.moveFocus(current, step);
    }
}
