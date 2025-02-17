import {Directive, ElementRef, inject, Output} from '@angular/core';
import {tuiDragAndDropFrom, TuiDragStage} from '@taiga-ui/cdk/observables';
import {filter, map, Observable} from 'rxjs';

/**
 * @deprecated not used anywhere
 */
@Directive({
    selector: '[tuiDragStart], [tuiDragContinues], [tuiDragEnd]',
})
export class TuiDragDirective {
    private readonly dragAndDropFrom$ = tuiDragAndDropFrom(
        inject(ElementRef).nativeElement,
    );

    @Output('tuiDragStart')
    // eslint-disable-next-line @angular-eslint/no-output-native
    readonly start: Observable<MouseEvent> = this.dragAndDropFrom$.pipe(
        filter(({stage}) => stage === TuiDragStage.Start),
        map(({event}) => event),
    );

    @Output('tuiDragContinues')
    readonly continues: Observable<MouseEvent> = this.dragAndDropFrom$.pipe(
        filter(({stage}) => stage === TuiDragStage.Continues),
        map(({event}) => event),
    );

    @Output('tuiDragEnd')
    // eslint-disable-next-line @angular-eslint/no-output-native
    readonly end: Observable<MouseEvent> = this.dragAndDropFrom$.pipe(
        filter(({stage}) => stage === TuiDragStage.End),
        map(({event}) => event),
    );
}
