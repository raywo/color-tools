import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ColorService} from '../../services/color-service';
import {Subscription} from 'rxjs';
import chroma, {Color} from 'chroma-js';
import {ColorSwatch} from '../color-swatch/color-swatch';
import {DecimalPipe} from '@angular/common';
import {ColorSpace} from '../../models/color-space.model';


@Component({
  selector: 'app-color-swatches',
  imports: [
    ColorSwatch,
    DecimalPipe
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

  protected readonly swatchSteps = computed(() => {
    const length = this.lighterColors().length;
    const step = length > 1 ? 1 / (length - 1) : 1;

    return Array.from({length}, (_, i) => i * step);
  });


  public ngOnInit() {
    this.subscription = this.currentColor$
      .subscribe(color => {
        const lighterColors: Color[] = [];
        const darkerColors: Color[] = [];
        const lighterScale = chroma.scale([color.hex(), "white"]);
        const darkerScale = chroma.scale([color.hex(), "black"]);

        for (let i = 0; i <= 1; i = i + 0.1) {
          lighterColors.push(lighterScale(i));
          darkerColors.push(darkerScale(i));
        }

        this.lighterColors.set(lighterColors);
        this.darkerColors.set(darkerColors);
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
