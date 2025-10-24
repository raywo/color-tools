import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorService} from '../../services/color-service';
import {Subscription} from 'rxjs';
import chroma from 'chroma-js';
import {inRgbRange} from '../../helpers/range.helper';
import {CopyCss} from '../copy-css/copy-css';
import {RangedInput} from '../ranged-input/ranged-input';


@Component({
  selector: 'app-rgb-input',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CopyCss,
    RangedInput
  ],
  templateUrl: './rgb-input.html',
  styles: ``
})
export class RgbInput implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);

  private subscription?: Subscription;

  protected readonly red = signal<number | null>(0);
  protected readonly green = signal<number | null>(0);
  protected readonly blue = signal<number | null>(0);

  private readonly color = computed(() => {
    const red = this.red();
    const green = this.green();
    const blue = this.blue();

    if (!inRgbRange(red) || !inRgbRange(green) || !inRgbRange(blue)) {
      return null;
    }

    return chroma([red, green, blue]);
  });


  public ngOnInit() {
    this.subscription = this.colorService.currentColor$
      .subscribe(color => {
        const rgb = color.rgb();
        this.red.set(rgb[0]);
        this.green.set(rgb[1]);
        this.blue.set(rgb[2]);
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  protected redChanged(value: number | null) {
    this.red.set(value ?? 0);
    this.colorChanged();
  }


  protected greenChanged(value: number | null) {
    this.green.set(value ?? 0);
    this.colorChanged();
  }


  protected blueChanged(value: number | null) {
    this.blue.set(value ?? 0);
    this.colorChanged();
  }


  private colorChanged() {
    const color = this.color();

    if (color) {
      this.colorService.currentColor = color;
    }
  }

}
