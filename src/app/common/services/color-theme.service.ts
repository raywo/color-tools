import {DOCUMENT, inject, Injectable} from '@angular/core';
import {ColorTheme} from '@common/models/color-theme.model';


@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {

  private readonly document = inject(DOCUMENT);


  public set colorTheme(value: ColorTheme) {
    if (value === "system") value = this.getSystemTheme();

    this.document.body.setAttribute("data-bs-theme", value);
  }


  private getSystemTheme(): ColorTheme {
    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .matches ? 'dark' : 'light'
  }

}
