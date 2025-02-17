import {ChangeDetectionStrategy, Component, ElementRef, inject} from '@angular/core';
import {tuiAsPortal, TuiPortalsComponent} from '@taiga-ui/cdk';
import {tuiAsViewport, TuiDropdownService, TuiRectAccessor} from '@taiga-ui/core';

@Component({
    selector: 'portal-host',
    template: `
        <ng-content></ng-content>
        <ng-container #viewContainer></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TuiDropdownService,
        tuiAsPortal(TuiDropdownService),
        tuiAsViewport(PortalHost),
    ],
})
export class PortalHost extends TuiPortalsComponent implements TuiRectAccessor {
    private readonly el: HTMLElement = inject(ElementRef).nativeElement;

    readonly type = 'viewport';

    getClientRect(): DOMRect {
        return this.el.getBoundingClientRect();
    }
}
