import {Component, inject, INJECTOR} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiPopoverContext} from '@taiga-ui/cdk';
import {
    TUI_NOTIFICATION_OPTIONS,
    TuiAlertOptions,
    TuiAlertService,
    TuiNotification,
} from '@taiga-ui/core';
import {PolymorpheusComponent, PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {switchMap} from 'rxjs';

import {AlertExampleWithDataComponent} from './examples/4/alert-example-with-data/alert-example-with-data.component';

@Component({
    selector: 'example-tui-alert',
    templateUrl: './alert.template.html',
    styleUrls: ['./alert.style.less'],
    changeDetection,
})
export class ExampleTuiAlertComponent {
    private readonly alerts = inject(TuiAlertService);

    private readonly defaultIcon = inject(TUI_NOTIFICATION_OPTIONS).icon;

    readonly method = import('./method.md?raw');

    readonly exampleServiceUsage = import('./examples/import/service-usage.md?raw');

    readonly exampleServiceUsageComponent = import(
        './examples/import/service-usage-component.md?raw'
    );

    readonly exampleCustomAlert = import('./examples/import/custom-alert.md?raw');

    readonly exampleLazyModule = import('./examples/import/lazy-module.md?raw');
    readonly exampleOptions = import('./examples/import/define-options.md?raw');

    readonly example1: TuiDocExample = {
        TypeScript: import('./examples/1/index.ts?raw'),
        HTML: import('./examples/1/index.html?raw'),
    };

    readonly example2: TuiDocExample = {
        TypeScript: import('./examples/2/index.ts?raw'),
        HTML: import('./examples/2/index.html?raw'),
    };

    readonly example3: TuiDocExample = {
        TypeScript: import('./examples/3/index.ts?raw'),
        HTML: import('./examples/3/index.html?raw'),
        'alert-example/alert-example.component.ts': import(
            './examples/3/alert-example/alert-example.component.ts?raw'
        ),
        'alert-example/alert-example.template.html': import(
            './examples/3/alert-example/alert-example.template.html?raw'
        ),
        'alert-example/alert-example.module.ts': import(
            './examples/3/alert-example/alert-example.module.ts?raw'
        ),
    };

    readonly example4: TuiDocExample = {
        TypeScript: import('./examples/4/index.ts?raw'),
        HTML: import('./examples/4/index.html?raw'),
        'alert-example-with-data/alert-example-with-data.component.ts': import(
            './examples/4/alert-example-with-data/alert-example-with-data.component.ts?raw'
        ),
        'alert-example-with-data/alert-example-with-data.template.html': import(
            './examples/4/alert-example-with-data/alert-example-with-data.template.html?raw'
        ),
        'alert-example-with-data/alert-example-with-data.style.less': import(
            './examples/4/alert-example-with-data/alert-example-with-data.style.less?raw'
        ),
        'alert-example-with-data/alert-example-with-data.module.ts': import(
            './examples/4/alert-example-with-data/alert-example-with-data.module.ts?raw'
        ),
    };

    readonly example5: TuiDocExample = {
        TypeScript: import('./examples/5/index.ts?raw'),
        HTML: import('./examples/5/index.html?raw'),
        'custom-label/custom-label.module.ts': import(
            './examples/5/custom-label/custom-label.module.ts?raw'
        ),
        'custom-label/custom-label.component.ts': import(
            './examples/5/custom-label/custom-label.component.ts?raw'
        ),
        'custom-label/custom-label.style.less': import(
            './examples/5/custom-label/custom-label.style.less?raw'
        ),
        'custom-label/custom-label.template.html': import(
            './examples/5/custom-label/custom-label.template.html?raw'
        ),
        'alert-example-with-custom-label/alert-example-with-custom-label.module.ts':
            import(
                './examples/5/alert-example-with-custom-label/alert-example-with-custom-label.module.ts?raw'
            ),
        'alert-example-with-custom-label/alert-example-with-custom-label.component.ts':
            import(
                './examples/5/alert-example-with-custom-label/alert-example-with-custom-label.component.ts?raw'
            ),
        'alert-example-with-custom-label/alert-example-with-custom-label.template.html':
            import(
                './examples/5/alert-example-with-custom-label/alert-example-with-custom-label.template.html?raw'
            ),
    };

    readonly example6: TuiDocExample = {
        TypeScript: import('./examples/6/index.ts?raw'),
        HTML: import('./examples/6/index.html?raw'),
    };

    data = 100;

    label = 'Heading';

    readonly statusVariants: TuiNotification[] = ['info', 'success', 'error', 'warning'];

    status = this.statusVariants[0];

    readonly iconVariants = ['Default', 'tuiIconHeart'];

    icon = this.iconVariants[0];

    readonly contentVariants = ['String', 'Component'];

    content = this.contentVariants[0];

    readonly autoCloseVariants = [0, 3000, 5000, 1000, 500];

    autoClose = this.autoCloseVariants[1];

    closeable = true;

    readonly component = new PolymorpheusComponent(
        AlertExampleWithDataComponent,
        inject(INJECTOR),
    );

    get selectedContent(): PolymorpheusContent<
        TuiAlertOptions<number> & TuiPopoverContext<number>
    > {
        return this.content === 'String' ? this.content : this.component;
    }

    showNotification(): void {
        this.alerts
            .open(this.selectedContent, {
                label: this.label,
                data: this.data,
                status: this.status,
                autoClose: this.autoClose,
                closeable: this.closeable,
                icon: this.icon === this.iconVariants[0] ? this.defaultIcon : this.icon,
            })
            .pipe(
                switchMap(response =>
                    this.alerts.open(response, {
                        label: 'Notification responded with:',
                    }),
                ),
            )
            .subscribe();
    }
}
