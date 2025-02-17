import {Component, inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';

@Component({
    selector: 'tui-pdf-viewer-example-3',
    templateUrl: 'index.html',
    styleUrls: ['index.less'],
    encapsulation,
    changeDetection,
})
export class TuiPdfViewerExample3 {
    private readonly isMobile = inject(TUI_IS_MOBILE);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly pdf = 'assets/media/taiga.pdf';

    open = false;

    /**
     * @description:
     * Embedded PDFs in mobile doesn't work,
     * so you can use third-party services
     * or your own service to render PDF in mobile iframe
     */
    readonly src = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.isMobile
            ? `https://drive.google.com/viewerng/viewer?embedded=true&url=https://taiga-ui.dev/${this.pdf}`
            : this.pdf,
    );
}
