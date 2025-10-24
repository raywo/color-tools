import {Component, computed, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';


@Component({
  selector: 'app-key-value-display',
  imports: [
    DecimalPipe
  ],
  templateUrl: './key-value-display.html',
  styles: ``
})
export class KeyValueDisplay {

  public readonly key = input.required<string>();
  public readonly value = input.required<number>();
  public readonly precision = input<number>(2);

  protected readonly digitsInfo = computed(() => {
    return `1.${this.precision()}-${this.precision()}`;
  });

}
