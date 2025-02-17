/// <reference types="@taiga-ui/tsconfig/ng-dev-mode" />
import {tuiAssert} from '@taiga-ui/cdk/classes';

/**
 * Rounds a number to the closest value in a fixed discrete series
 *
 * @param value
 * @param quantum series step
 */
export function tuiQuantize(value: number, quantum: number): number {
    ngDevMode && tuiAssert.assert(Number.isFinite(value));
    ngDevMode && tuiAssert.assert(Number.isFinite(quantum));
    ngDevMode && tuiAssert.assert(quantum > 0);

    const remainder = value % quantum;

    return remainder < quantum / 2 ? value - remainder : value + quantum - remainder;
}
