import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {tuiDropdownOptionsProvider} from '@taiga-ui/core';
import {tuiButtonOptionsProvider} from '@taiga-ui/experimental/components/button';

@Component({
    selector: 'aside[tuiNavigationAside]',
    template: `
        <ng-content select="header"></ng-content>
        <tui-scrollbar class="t-nav-scrollbar">
            <div
                tuiFade="vertical"
                tuiScrollable
                class="t-nav-content"
            >
                <ng-content></ng-content>
            </div>
        </tui-scrollbar>
        <ng-content select="footer"></ng-content>
    `,
    styleUrls: ['./aside.style.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiButtonOptionsProvider({size: 's', appearance: 'flat'}),
        tuiDropdownOptionsProvider({appearance: 'dropdown-navigation', align: 'right'}),
    ],
    host: {
        tuiNavigationAside: '',
        tuiTheme: 'night',
        '[class._expanded]': 'tuiNavigationAside',
    },
})
export class TuiAsideComponent {
    @Input()
    tuiNavigationAside = false;
}
