import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {
    TuiDocCodeModule,
    TuiDocExample,
    TuiDocExampleModule,
    TuiDocPageModule,
    TuiLanguageSwitcherComponent,
} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {from, map} from 'rxjs';

@Component({
    standalone: true,
    selector: 'i18n',
    imports: [
        TuiDocPageModule,
        TuiDocCodeModule,
        TuiLinkModule,
        AsyncPipe,
        TuiDocExampleModule,
        TuiLanguageSwitcherComponent,
    ],
    templateUrl: './i18n.template.html',
    changeDetection,
})
export default class I18nComponent {
    readonly readme = from(
        import('../../../../../i18n/README.md?raw') as Promise<{
            default: string;
        }>,
    ).pipe(map(readme => readme.default.split('Supported languages:')[1]));

    exampleModule = import('./app.module.md?raw');
    exampleEsbuildModule = import('./app.esbuild.module.md?raw');

    example1: TuiDocExample = {
        'language-switcher.component.html': import(
            '../../../../../addon-doc/components/language-switcher/language-switcher.component.html?raw'
        ),
        'language-switcher.component.ts': import(
            '../../../../../addon-doc/components/language-switcher/language-switcher.component.ts?raw'
        ),
        'language-switcher.module.less': import(
            '../../../../../addon-doc/components/language-switcher/language-switcher.component.less?raw'
        ),
    };
}
