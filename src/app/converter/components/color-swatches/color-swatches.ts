import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ColorService} from '@converter/services/color-service';
import {combineLatest, Subscription} from 'rxjs';
import {Color} from 'chroma-js';
import {ColorSwatch} from '@converter/components/color-swatch/color-swatch';
import {DecimalPipe} from '@angular/common';
import {ColorSpace} from '@common/models/color-space.model';
import {FormsModule} from '@angular/forms';
import {toObservable} from '@angular/core/rxjs-interop';
import {createShades, createTints} from "@common/helpers/tints-and-shades.helper";


@Component({
  selector: 'app-color-swatches',
  imports: [
    ColorSwatch,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './color-swatches.html',
  styles: ``
})
export class ColorSwatches implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);
  private readonly currentColor$ = this.colorService.currentColor$;

  private subscription?: Subscription;

  protected readonly colorMode = signal<ColorSpace>("hsl");
  protected readonly lighterColors = signal<Color[]>([]);
  protected readonly darkerColors = signal<Color[]>([]);

  protected readonly correctLightness = signal(true);
  private readonly correctLightness$ = toObservable(this.correctLightness);

  protected readonly useBezier = signal(false);
  private readonly useBezier$ = toObservable(this.useBezier);

  protected readonly swatchSteps = computed(() => {
    const length = this.lighterColors().length;
    const step = length > 1 ? 1 / (length - 1) : 1;

    return Array.from({length}, (_, i) => i * step);
  });


  public ngOnInit() {
    this.subscription = combineLatest([this.currentColor$, this.correctLightness$, this.useBezier$])
      .subscribe(([color, correctLightness, useBezier]) => {
        const lighterColors = createTints(color, useBezier, correctLightness);
        const darkerColors = createShades(color, useBezier, correctLightness);

        this.lighterColors.set(lighterColors);
        this.darkerColors.set(darkerColors);
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
