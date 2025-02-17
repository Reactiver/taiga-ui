import {
    AfterContentChecked,
    AfterContentInit,
    ContentChildren,
    Directive,
    ElementRef,
    HostListener,
    inject,
    QueryList,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {RouterLinkActive} from '@angular/router';
import {EMPTY_QUERY, TuiDestroyService, tuiQueryListChanges} from '@taiga-ui/cdk';
import {EMPTY, switchMap, takeUntil} from 'rxjs';

import {TuiSegmentedComponent} from './segmented.component';

@Directive({
    standalone: true,
    selector: 'tui-segmented:not(tui-segmented)',
})
export class TuiSegmentedDirective implements AfterContentChecked, AfterContentInit {
    @ContentChildren(NgControl, {descendants: true})
    private readonly controls: QueryList<NgControl> = EMPTY_QUERY;

    @ContentChildren(RouterLinkActive)
    private readonly links: QueryList<RouterLinkActive> = EMPTY_QUERY;

    @ContentChildren(RouterLinkActive, {read: ElementRef})
    private readonly elements: QueryList<ElementRef<HTMLElement>> = EMPTY_QUERY;

    private readonly destroy$ = inject(TuiDestroyService, {self: true});
    private readonly component = inject(TuiSegmentedComponent);
    private readonly el: HTMLElement = inject(ElementRef).nativeElement;

    @HostListener('click', ['$event.target'])
    update(target: Element | null): void {
        const index = this.getIndex(target);

        if (index >= 0) {
            this.component.update(index);
        }
    }

    ngAfterContentInit(): void {
        tuiQueryListChanges(this.controls)
            .pipe(
                switchMap(() => this.controls.last?.valueChanges || EMPTY),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                this.update(this.el.querySelector(':checked'));
            });
    }

    ngAfterContentChecked(): void {
        if (this.links.length) {
            this.update(this.elements.get(this.linkIndex)?.nativeElement || null);
        }
    }

    private get linkIndex(): number {
        return this.links.toArray().findIndex(link => link.isActive);
    }

    private getIndex(element: Element | null): number {
        return Array.from(this.el.children).findIndex(tab => tab.contains(element));
    }
}
