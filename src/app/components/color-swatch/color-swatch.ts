import {Component, computed, input} from '@angular/core';
import {Color} from 'chroma-js';
import {ColorSpace} from '../../models/color-space.model';
import {NgTemplateOutlet} from '@angular/common';
import {KeyValueDisplay} from '../key-value-display/key-value-display';


@Component({
  selector: 'app-color-swatch',
  imports: [
    NgTemplateOutlet,
    KeyValueDisplay
  ],
  templateUrl: './color-swatch.html',
  styles: ``
})
export class ColorSwatch {

  public readonly color = input.required<Color>();
  public readonly colorMode = input.required<ColorSpace>();

  protected cssToCopy = computed(() => {
    switch (this.colorMode()) {
      case "hex":
        return this.color().hex();
      case "rgb":
        return this.color().css("rgb");
      case "hsl":
        return this.color().css("hsl");
      default:
        return this.color().hex();
    }
  });


  protected copyToClipboard() {
    navigator.clipboard.writeText(this.cssToCopy());
  }

}
