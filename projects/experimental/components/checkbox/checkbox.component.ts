import {
    ChangeDetectionStrategy,
    Component,
    DoCheck,
    ElementRef,
    inject,
    Input,
    OnInit,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    tuiControlValue,
    TuiDestroyService,
    tuiIsString,
    TuiNativeValidatorDirective,
} from '@taiga-ui/cdk';
import {TUI_ICON_RESOLVER, TuiAppearanceDirective, TuiSizeS} from '@taiga-ui/core';
import {takeUntil} from 'rxjs';

import {TUI_CHECKBOX_OPTIONS} from './checkbox.options';

@Component({
    selector: 'input[type="checkbox"][tuiCheckbox]',
    template: '',
    styleUrls: ['./checkbox.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
    hostDirectives: [
        {
            directive: TuiAppearanceDirective,
            inputs: [
                'tuiAppearance: appearance',
                'tuiAppearanceState',
                'tuiAppearanceFocus',
            ],
        },
        TuiNativeValidatorDirective,
    ],
    host: {
        '[disabled]': '!control || control.disabled',
        '[attr.data-size]': 'size',
        '[class._readonly]': '!control',
        '[style.--t-checked]': 'getIcon("checked")',
        '[style.--t-indeterminate]': 'getIcon("indeterminate")',
    },
})
export class TuiCheckboxComponent implements OnInit, DoCheck {
    private readonly appearance = inject(TuiAppearanceDirective);
    private readonly options = inject(TUI_CHECKBOX_OPTIONS);
    private readonly resolver = inject(TUI_ICON_RESOLVER);
    private readonly destroy$ = inject(TuiDestroyService, {self: true});
    private readonly el: HTMLInputElement = inject(ElementRef).nativeElement;

    @Input()
    size: TuiSizeS = this.options.size;

    readonly control: NgControl | null = inject(NgControl, {optional: true});

    ngOnInit(): void {
        if (!this.control?.valueChanges) {
            return;
        }

        tuiControlValue(this.control)
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.el.indeterminate = value === null;
            });
    }

    ngDoCheck(): void {
        this.appearance.tuiAppearance = this.options.appearance(this.el);
    }

    getIcon(state: 'checked' | 'indeterminate'): string {
        const option = this.options.icons[state];
        const icon = tuiIsString(option) ? option : option(this.size);

        return `url(${this.resolver(icon)})`;
    }
}
