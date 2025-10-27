import {DOCUMENT, inject, Injectable} from '@angular/core';
import {ColorMode} from '../models/color-mode.model';
import {BehaviorSubject} from 'rxjs';
import {LocalStorage} from './local-storage';


@Injectable({
  providedIn: 'root'
})
export class ColorModeService {

  private readonly localStorageService = inject(LocalStorage);
  private readonly document = inject(DOCUMENT);

  private readonly _colorMode = new BehaviorSubject<ColorMode>("dark");
  public readonly colorMode$ = this._colorMode.asObservable();


  constructor() {
    this.updateFromSettings();
  }


  public updateFromSettings(): void {
    this.colorMode = this.localStorageService
      .getOrDefault("colorMode", "dark");
  }


  public set colorMode(value: ColorMode) {
    this._colorMode.next(value);
    this.localStorageService.set("colorMode", value);

    if (value === "system") value = this.getSystemTheme();

    this.document.body.setAttribute("data-bs-theme", value);
  }


  public get colorMode(): ColorMode {
    return this._colorMode.value;
  }


  private getSystemTheme(): ColorMode {
    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .matches ? 'dark' : 'light'
  }

}
