import {ElementRef, inject, Pipe, PipeTransform} from '@angular/core';
import {TUI_ICON_ERROR} from '@taiga-ui/core';
import {fromEvent, map, merge, Observable, startWith} from 'rxjs';

@Pipe({
    name: 'tuiFallbackSrc',
})
export class TuiFallbackSrcPipe implements PipeTransform {
    private readonly el: HTMLElement = inject(ElementRef).nativeElement;

    transform(src: string, fallback: string): Observable<string> {
        return merge(
            fromEvent(this.el, TUI_ICON_ERROR),
            fromEvent(this.el, 'error', {capture: true}),
        ).pipe(
            map(() => fallback),
            startWith(src),
        );
    }
}
