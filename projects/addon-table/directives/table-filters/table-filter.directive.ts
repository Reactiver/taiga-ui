import {Directive, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {TuiHeadDirective} from '@taiga-ui/addon-table/components';
import {TuiValuesOf} from '@taiga-ui/cdk';
import {defer, distinctUntilChanged, EMPTY, merge} from 'rxjs';

import {AbstractTuiTableFilter} from './abstract-table-filter';
import {TuiTableFilter} from './table-filter';
import {TuiTableFiltersDirective} from './table-filters.directive';

@Directive({
    selector: '[tuiTableFilter]',
})
export class TuiTableFilterDirective<T> implements OnInit, OnDestroy, TuiTableFilter<T> {
    private readonly head = inject(TuiHeadDirective<T>, {optional: true});
    private readonly delegate = inject(AbstractTuiTableFilter<TuiValuesOf<T>, any>);
    private readonly control = inject(NgControl);

    @Input()
    tuiTableFilter?: keyof T;

    readonly filters = inject(TuiTableFiltersDirective<T>);

    readonly refresh$ = defer(() =>
        merge(
            this.control.valueChanges || EMPTY,
            this.control.statusChanges?.pipe(distinctUntilChanged()) || EMPTY,
        ),
    );

    ngOnInit(): void {
        this.filters.register(this);
    }

    ngOnDestroy(): void {
        this.filters.unregister(this);
    }

    filter(item: T): boolean {
        const {disabled, value} = this.control;

        return !!disabled || !this.key || this.delegate.filter(item[this.key], value);
    }

    private get key(): keyof T | undefined {
        return this.tuiTableFilter || this.head?.tuiHead;
    }
}
