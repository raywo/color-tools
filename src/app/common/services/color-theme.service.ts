import {DOCUMENT, inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorage} from './local-storage';
import {ColorTheme} from '@common/models/color-theme.model';


@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {

  private readonly localStorageService = inject(LocalStorage);
  private readonly document = inject(DOCUMENT);

  private readonly _colorTheme = new BehaviorSubject<ColorTheme>("dark");
  public readonly colorTheme$ = this._colorTheme.asObservable();


  constructor() {
    this.updateFromSettings();
  }


  public updateFromSettings(): void {
    this.colorTheme = this.localStorageService
      .getOrDefault("colorTheme", "dark");
  }


  public set colorTheme(value: ColorTheme) {
    this._colorTheme.next(value);
    this.localStorageService.set("colorTheme", value);

    if (value === "system") value = this.getSystemTheme();

    this.document.body.setAttribute("data-bs-theme", value);
  }


  public get colorTheme(): ColorTheme {
    return this._colorTheme.value;
  }


  private getSystemTheme(): ColorTheme {
    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .matches ? 'dark' : 'light'
  }

}
