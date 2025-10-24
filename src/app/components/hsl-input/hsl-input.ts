import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ColorService} from '../../services/color-service';
import {Subscription} from 'rxjs';
import {inHslAngleRange, inHslPercentRange} from '../../helpers/range.helper';
import chroma from 'chroma-js';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CopyCss} from '../copy-css/copy-css';
import {RangedInput} from '../ranged-input/ranged-input';


@Component({
  selector: 'app-hsl-input',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CopyCss,
    RangedInput
  ],
  templateUrl: './hsl-input.html',
  styles: ``
})
export class HslInput implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);

  private subscription?: Subscription;

  protected readonly hue = signal<number | null>(0);
  protected readonly saturation = signal<number | null>(0);
  protected readonly luminance = signal<number | null>(0);

  private readonly color = computed(() => {
    const hue = this.hue();
    const saturation = this.saturation();
    const luminance = this.luminance();

    if (!inHslAngleRange(hue) || !inHslPercentRange(saturation) || !inHslPercentRange(luminance)) {
      return null;
    }

    return chroma.hsl(hue, saturation / 100, luminance / 100);
  });


  public ngOnInit() {
    this.subscription = this.colorService.currentColor$
      .subscribe(color => {
        // For colors like #222222, chroma.js returns NaN for hue. We need to
        // fix that. Therefore, we map all NaN values to 0.
        const hsl = color.hsl()
          .map(val => Number.isNaN(val) ? 0 : val);

        this.hue.set(hsl[0]);
        this.saturation.set(hsl[1] * 100);
        this.luminance.set(hsl[2] * 100);
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  protected hueChanged(value: number | null) {
    this.hue.set(value ?? 0);
    this.colorChanged();
  }


  protected saturationChanged(value: number | null) {
    this.saturation.set(value ?? 0);
    this.colorChanged();
  }


  protected luminanceChanged(value: number | null) {
    this.luminance.set(value ?? 0);
    this.colorChanged();
  }


  private colorChanged() {
    const color = this.color();

    if (color) {
      this.colorService.currentColor = color;
    }
  }

}
