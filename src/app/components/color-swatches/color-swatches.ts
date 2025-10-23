import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {ColorService} from '../../services/color-service';
import {SwatchMode} from '../../models/swatch-mode.model';
import {Subscription} from 'rxjs';
import chroma, {Color} from 'chroma-js';
import {ColorSwatch} from '../color-swatch/color-swatch';


@Component({
  selector: 'app-color-swatches',
  imports: [
    ColorSwatch
  ],
  templateUrl: './color-swatches.html',
  styles: ``
})
export class ColorSwatches implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);
  private readonly currentColor$ = this.colorService.currentColor$;

  private subscription?: Subscription;

  protected readonly swatchColors = signal<Color[]>([]);

  public readonly mode = input.required<SwatchMode>();


  public ngOnInit() {
    this.subscription = this.currentColor$
      .subscribe(color => {
        const colors: Color[] = [];
        const targetColor = this.mode() === "light" ? "white" : "black";
        const scaledColor = chroma.scale([color.hex(), targetColor]);

        for (let i = 0; i <= 1; i = i + 0.1) {
          colors.push(scaledColor(i));
        }

        this.swatchColors.set(colors);
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
