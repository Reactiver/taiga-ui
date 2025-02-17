import {Component, inject} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {
    TUI_ANDROID_LOADER,
    TUI_PULL_TO_REFRESH_COMPONENT,
    TUI_PULL_TO_REFRESH_LOADED,
} from '@taiga-ui/addon-mobile';
import {TUI_IS_ANDROID, TUI_IS_IOS} from '@taiga-ui/cdk';
import {TuiAlertService} from '@taiga-ui/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'tui-pull-to-refresh-example-1',
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
        {
            provide: TUI_PULL_TO_REFRESH_COMPONENT,
            useValue: TUI_ANDROID_LOADER,
        },
        {
            provide: TUI_PULL_TO_REFRESH_LOADED,
            useClass: Subject,
        },
    ],
})
export class TuiPullToRefreshExample1 {
    private readonly alerts = inject(TuiAlertService);
    private readonly loaded$ = inject<Subject<void>>(TUI_PULL_TO_REFRESH_LOADED);

    onPull(): void {
        this.alerts.open('Loading...').subscribe();
    }

    finishLoading(): void {
        this.loaded$.next();
    }
}
