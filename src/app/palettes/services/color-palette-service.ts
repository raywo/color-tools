import {inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Color} from 'chroma-js';
import {generatePalette} from '@palettes/helper/palette.helper';
import {PaletteStyle, PaletteStyles} from '@palettes/models/palette-style.model';
import {NewColor} from '@common/services/new-color';
import {randomBetween} from '@common/helpers/random.helper';


@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService implements OnDestroy {

  private readonly newColor = inject(NewColor);
  private readonly subscriptions: Subscription[] = [];

  private readonly _palette = new BehaviorSubject<Color[]>([]);
  public readonly palette$ = this._palette.asObservable();

  private readonly _style = new BehaviorSubject<PaletteStyle>("vibrant-balanced");
  public readonly style$ = this._style.asObservable();

  private readonly _useRandom = new BehaviorSubject<boolean>(true);
  public readonly useRandom$ = this._useRandom.asObservable();


  constructor() {
    this.subscriptions.push(this.newColor.newColor$
      .subscribe(() => this.newRandomPalette(this.style))
    );
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  public get style(): PaletteStyle {
    return this._style.value;
  }


  public set style(value: PaletteStyle) {
    this._style.next(value);
    this.palette = generatePalette(value);
    // this.newRandomPalette(value, false);
  }


  private set palette(colors: Color[]) {
    this._palette.next(colors);
  }


  public get palette(): Color[] {
    return this._palette.value;
  }


  public set useRandom(value: boolean) {
    this._useRandom.next(value);
  }


  public get useRandom(): boolean {
    return this._useRandom.value;
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


  public newRandomPalette(style: PaletteStyle = "vibrant-balanced") {
    this.style = this.useRandom ? this.randomStyle() : style;
  }


  private randomStyle(): PaletteStyle {
    const randomIndex = Math.floor(randomBetween(0, PaletteStyles.length));

    return PaletteStyles[randomIndex];
  }

}
