import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorService} from '../../services/color-service';
import {Subscription} from 'rxjs';
import chroma from 'chroma-js';
import {inRgbRange} from '../../helpers/range.helper';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-rgb-input',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './rgb-input.html',
  styles: ``
})
export class RgbInput implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);

  private subscription?: Subscription;

  protected readonly currentColor$ = this.colorService.currentColor$;
  protected readonly red = signal<number | null>(0);
  protected readonly green = signal<number | null>(0);
  protected readonly blue = signal<number | null>(0);

  protected readonly redRead = computed(() => {
    return this.red()?.toFixed(0) ?? 0;
  });

  protected readonly greenRead = computed(() => {
    return this.green()?.toFixed(0) ?? 0;
  });

  protected readonly blueRead = computed(() => {
    return this.blue()?.toFixed(0) ?? 0;
  });


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


  protected redChanged(value: string) {
    this.red.set(parseFloat(value));
    this.colorChanged();
  }


  protected greenChanged(value: string) {
    this.green.set(parseFloat(value));
    this.colorChanged();
  }


  protected blueChanged(value: string) {
    this.blue.set(parseFloat(value));
    this.colorChanged();
  }


  private colorChanged() {
    const color = this.color();

    if (color) {
      this.colorService.currentColor = color;
    }
  }

}
