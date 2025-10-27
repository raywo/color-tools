import {Component, input} from '@angular/core';
import {Color} from 'chroma-js';


@Component({
  selector: 'app-single-palette-color',
  imports: [],
  templateUrl: './single-palette-color.html',
  styles: ``,
})
export class SinglePaletteColor {

  public readonly color = input.required<Color>();

}
