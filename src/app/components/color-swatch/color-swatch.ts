import {Component, input} from '@angular/core';
import {Color} from 'chroma-js';


@Component({
  selector: 'app-color-swatch',
  imports: [],
  templateUrl: './color-swatch.html',
  styles: ``
})
export class ColorSwatch {

  public readonly color = input.required<Color>();

}
