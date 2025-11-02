import {inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {generatePalette} from '@palettes/helper/palette.helper';
import {PaletteStyle, PaletteStyles} from '@palettes/models/palette-style.model';
import {NewColor} from '@common/services/new-color';
import {randomBetween} from '@common/helpers/random.helper';
import {PaletteColor} from '@palettes/models/palette-color.model';
import {EMPTY_PALETTE, Palette, PaletteSlot} from "@palettes/models/palette.model";


@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService implements OnDestroy {

  private readonly newColor = inject(NewColor);
  private readonly subscriptions: Subscription[] = [];

  private readonly _palette = new BehaviorSubject<Palette>(EMPTY_PALETTE);
  public readonly palette$ = this._palette.asObservable();

  private readonly _style = new BehaviorSubject<PaletteStyle>("muted-analog-split");
  public readonly style$ = this._style.asObservable();

  private readonly _useRandom = new BehaviorSubject<boolean>(false);
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
    // console.log(
    //   "set style to:", value,
    //   "\ncurrent palette: ", this.palette.map(c => (`hex: ${c.color.hex()}, isPinned: ${c.isPinned}`)).join("\n")
    // );
    this.palette = generatePalette(value);
  }


  public updateColor(color: PaletteColor) {
    const slot: PaletteSlot = color.slot;

    this.palette = {
      ...this.palette,
      [slot]: color
    };
  }


  private set palette(palette: Palette) {
    this._palette.next(palette);
  }


  public get palette(): Palette {
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


  public newRandomPalette(style: PaletteStyle = "muted-analog-split") {
    this.style = this.useRandom ? this.randomStyle() : style;
  }


  private randomStyle(): PaletteStyle {
    const randomIndex = Math.floor(randomBetween(0, PaletteStyles.length));

    return PaletteStyles[randomIndex];
  }

}
