import {Component, inject} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TUI_IS_ANDROID, TUI_IS_IOS} from '@taiga-ui/cdk';
import {TuiAlertService} from '@taiga-ui/core';

@Component({
    selector: 'tui-tabs-example-1',
    templateUrl: './index.html',
    encapsulation,
    changeDetection,
    providers: [
        {
            provide: TUI_IS_IOS,
            useValue: false,
        },
        {
            provide: TUI_IS_ANDROID,
            useValue: true,
        },
    ],
})
export class TuiTabsExample1 {
    private readonly alerts = inject(TuiAlertService);

    readonly items = [
        {
            text: 'Maps',
            icon: 'tuiIconCreditCard',
        },
        {
            text: 'Calls',
            icon: 'tuiIconPhone',
        },
        {
            text: 'Settings',
            icon: 'tuiIconSettings',
        },
    ];

    activeItemIndex = 0;

    onClick(item: string): void {
        this.alerts.open(item).subscribe();
    }
}
