import {inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Color} from 'chroma-js';
import {ColorService} from '@converter/services/color-service';
import {generateRandomPalette} from '@palettes/helper/palette.helper';


@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService implements OnDestroy {

  private readonly colorService = inject(ColorService);
  private subscription?: Subscription;

  private _palette = new BehaviorSubject<Color[]>([]);
  public readonly palette$ = this._palette.asObservable();


  constructor() {
    this.subscription = this.colorService.currentColor$
      .subscribe(() => this.newRandomPalette());
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  public set palette(colors: Color[]) {
    this._palette.next(colors);
  }


  public get palette(): Color[] {
    return this._palette.value;
  }


  /*
    hsl(357.26deg 93.36% 58.63%), imperial red
    hsl(39.41deg 97.52% 52.55%), Orange (web)
    hsl(189.26deg 61.26% 43.53%), Moonstone
    hsl(140.75deg 44.03% 47.65%), Jade
    hsl(50.53deg 34.55% 78.43%), Pearl

    hsl(0deg 4.05% 33.92%), Davy’s gray
    hsl(351.06deg 19.83% 53.53%), Mountbatten pink
    hsl(21deg 44.44% 82.35%), Pale Dogwood
    hsl(308.57deg 9.68% 42.55%), Chinese Violet
    hsl(64.14deg 36.25% 68.63%), Sage

    hsl(38.59deg 100% 50%), Orange (web)
    hsl(202.29deg 100% 49.61%), Celestial Blue
    hsl(240deg 46.15% 30.59%), Royal Blue (traditional)
    hsl(216deg 6.67% 14.71%), Raisin Black
    hsl(205.71deg 100% 95.88%), Alice Blue
   */


  public newRandomPalette() {
    // const baseHsl = {h: Math.random() * 360, s: 0.65, l: 0.5};
    // const startColor = chroma.hsl(baseHsl.h, baseHsl.s, baseHsl.l); // chroma.random();

    // this.palette = generatePalette("muted-analog-split", startColor.hsl()[0]);
    this.palette = generateRandomPalette();
  }

}
