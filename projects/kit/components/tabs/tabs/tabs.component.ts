import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    inject,
    Input,
    QueryList,
} from '@angular/core';
import {
    MUTATION_OBSERVER_INIT,
    MutationObserverService,
} from '@ng-web-apis/mutation-observer';
import {ResizeObserverService} from '@ng-web-apis/resize-observer';
import {EMPTY_QUERY, TuiDestroyService, tuiPure} from '@taiga-ui/cdk';
import {filter, takeUntil} from 'rxjs';

import {TuiTabComponent} from '../tab/tab.component';
import {TuiTabsDirective} from '../tabs.directive';
import {TUI_TABS_OPTIONS} from '../tabs.options';

@Component({
    selector: 'tui-tabs:not([vertical]), nav[tuiTabs]:not([vertical])',
    templateUrl: './tabs.template.html',
    styleUrls: ['./tabs.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TuiDestroyService,
        ResizeObserverService,
        MutationObserverService,
        {
            provide: MUTATION_OBSERVER_INIT,
            useValue: {
                childList: true,
            },
        },
    ],
})
export class TuiTabsComponent implements AfterViewChecked {
    private readonly destroy$ = inject(TuiDestroyService, {self: true});
    private readonly el: HTMLElement = inject(ElementRef).nativeElement;
    private readonly resize$ = inject(ResizeObserverService);
    private readonly options = inject(TUI_TABS_OPTIONS);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly tabs = inject(TuiTabsDirective);

    @ContentChildren(forwardRef(() => TuiTabComponent))
    readonly children: QueryList<unknown> = EMPTY_QUERY;

    @Input()
    @HostBinding('class._underline')
    underline = this.options.underline;

    constructor() {
        this.resize$
            .pipe(
                filter(() => this.underline),
                takeUntil(this.destroy$),
            )
            .subscribe(() => this.cdr.detectChanges());
    }

    /** @deprecated use `activeItemIndex` from {@link TuiTabsDirective} instead */
    get activeItemIndex(): number {
        return this.tabs.activeItemIndex;
    }

    /** @deprecated use `activeItemIndex` from {@link TuiTabsDirective} instead */
    set activeItemIndex(index: number) {
        this.tabs.activeItemIndex = index;
    }

    get activeElement(): HTMLElement | null {
        return this.tabs.activeElement;
    }

    @HostListener('keydown.arrowRight.prevent', ['$event.target', '1'])
    @HostListener('keydown.arrowLeft.prevent', ['$event.target', '-1'])
    onKeyDownArrow(current: HTMLElement, step: number): void {
        this.tabs.moveFocus(current, step);
    }

    ngAfterViewChecked(): void {
        this.scrollTo(this.tabs.activeItemIndex);
    }

    @tuiPure
    private scrollTo(index: number): void {
        const element = this.tabs.tabs[index];

        if (!element) {
            return;
        }

        const {offsetLeft, offsetWidth} = element;

        if (offsetLeft < this.el.scrollLeft) {
            this.el.scrollLeft = offsetLeft;
        }

        if (offsetLeft + offsetWidth > this.el.scrollLeft + this.el.offsetWidth) {
            this.el.scrollLeft = offsetLeft + offsetWidth - this.el.offsetWidth;
        }
    }
}
