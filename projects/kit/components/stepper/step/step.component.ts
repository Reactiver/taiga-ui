import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    Input,
} from '@angular/core';
import {RouterLinkActive} from '@angular/router';
import {TuiDestroyService, TuiFocusVisibleService} from '@taiga-ui/cdk';
import {TUI_COMMON_ICONS} from '@taiga-ui/core';
import {EMPTY, filter, Observable} from 'rxjs';

import {TuiStepperComponent} from '../stepper.component';

@Component({
    selector:
        'button[tuiStep], a[tuiStep]:not([routerLink]), a[tuiStep][routerLink][routerLinkActive]',
    templateUrl: './step.template.html',
    styleUrls: ['./step.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService, TuiFocusVisibleService],
    host: {
        type: 'button',
    },
})
export class TuiStepComponent {
    private readonly focusVisible$ = inject(TuiFocusVisibleService);
    private readonly stepper = inject(TuiStepperComponent);
    private readonly el: HTMLElement = inject(ElementRef).nativeElement;
    private readonly routerLinkActive$: Observable<boolean> =
        inject(RouterLinkActive, {optional: true})?.isActiveChange || EMPTY;

    @Input()
    @HostBinding('attr.data-state')
    stepState: 'error' | 'normal' | 'pass' = 'normal';

    @Input()
    icon = '';

    @HostBinding('class._focus-visible')
    focusVisible = false;

    readonly icons = inject(TUI_COMMON_ICONS);

    constructor() {
        this.routerLinkActive$.pipe(filter(Boolean)).subscribe(() => {
            this.activate();
        });

        this.focusVisible$.subscribe(visible => {
            this.focusVisible = visible;
        });
    }

    @HostBinding('class._active')
    get isActive(): boolean {
        return this.stepper.isActive(this.index);
    }

    @HostBinding('class._vertical')
    get isVertical(): boolean {
        return this.stepper.orientation === 'vertical';
    }

    @HostBinding('tabIndex')
    get tabIndex(): number {
        return this.isActive ? 0 : -1;
    }

    get index(): number {
        return this.stepper.indexOf(this.el);
    }

    @HostListener('click')
    activate(): void {
        this.stepper.activate(this.index);
    }
}
