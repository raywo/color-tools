import {DOCUMENT, inject, Injectable} from '@angular/core';
import {ColorTheme} from '@common/models/color-theme.model';
import {Color} from "chroma-js";


@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {

  readonly #document = inject(DOCUMENT);


  public set colorTheme(value: ColorTheme) {
    if (value === "system") value = this.getSystemTheme();

    this.#document.body.setAttribute("data-bs-theme", value);
  }


  public setBackgroundColor(color: Color): void {
    this.#document.body.style.setProperty("--ct-body-bg", color.hex());
  }


  public resetBackgroundColor(): void {
    this.#document.body.style.removeProperty("--ct-body-bg");
  }


  private getSystemTheme(): ColorTheme {
    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .matches ? 'dark' : 'light'
  }

}
