import {inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE} from '@ng-web-apis/common';
import {TuiLanguage, TuiLanguageName} from '@taiga-ui/i18n/interfaces';
import {
    TUI_DEFAULT_LANGUAGE,
    TUI_LANGUAGE_LOADER,
    TUI_LANGUAGE_STORAGE_KEY,
} from '@taiga-ui/i18n/tokens';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {tuiAsyncLoadLanguage} from './utils';

@Injectable({providedIn: 'root'})
export class TuiLanguageSwitcher extends BehaviorSubject<Observable<TuiLanguage>> {
    private readonly fallback = inject(TUI_DEFAULT_LANGUAGE);
    private readonly key = inject(TUI_LANGUAGE_STORAGE_KEY);
    private readonly storage = inject(LOCAL_STORAGE);
    private readonly loader = inject(TUI_LANGUAGE_LOADER, {optional: true});

    constructor() {
        super(
            tuiAsyncLoadLanguage(
                inject(LOCAL_STORAGE).getItem(inject(TUI_LANGUAGE_STORAGE_KEY)),
                inject(TUI_LANGUAGE_LOADER, {optional: true}),
                inject(TUI_DEFAULT_LANGUAGE),
            ),
        );
    }

    get language(): TuiLanguageName {
        return this.storage.getItem(this.key) || this.fallback.name;
    }

    setLanguage(language: TuiLanguageName): void {
        this.storage.setItem(this.key, language);

        this.next(tuiAsyncLoadLanguage(language, this.loader, this.fallback));
    }

    clear(): void {
        this.storage.removeItem(this.key);

        this.next(of(this.fallback));
    }
}
