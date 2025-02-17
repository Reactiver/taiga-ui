import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiRawLoaderContent} from '@taiga-ui/addon-doc';

@Component({
    selector: 'example-card',
    templateUrl: './card-large.template.html',
    changeDetection,
})
export class ExampleTuiCardLargeComponent {
    readonly exampleModule: TuiRawLoaderContent = import(
        './examples/import/import-module.md?raw'
    );

    readonly exampleHtml: TuiRawLoaderContent = import(
        './examples/import/insert-template.md?raw'
    );
}
