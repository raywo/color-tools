import {Component, computed, input, output, signal} from '@angular/core';
import {contrastingColor, contrastingMutedColor} from '@common/helpers/contrasting-color.helper';
import {ToggleButton} from '@common/components/toggle-button/toggle-button';
import {PaletteColor} from "@palettes/models/palette-color.model";
import {PaletteSlot} from "@palettes/models/palette.model";
import {SingleColorShades} from "@palettes/components/single-color-shades/single-color-shades";
import {Color} from "chroma-js";
import {colorName} from "@common/helpers/color-name.helper";


@Component({
  selector: 'app-single-palette-color',
  imports: [
    ToggleButton,
    SingleColorShades
  ],
  templateUrl: './single-palette-color.html',
  styles: ``,
})
export class SinglePaletteColor {

  protected readonly colorName = computed(() => {
    return colorName(this.color().color);
  });

  protected readonly colorHex = computed(() => {
    return this.color().color.hex().toUpperCase();
  });

  protected readonly textColor = computed(() => {
    return contrastingColor(this.color().color);
  });

  protected readonly mutedTextColor = computed(() => {
    return contrastingMutedColor(this.color().color);
  });

  protected readonly isPinned = computed(() => {
    return this.color().isPinned;
  });

  protected readonly showShades = signal(false);


  public readonly color = input.required<PaletteColor>();
  public readonly slot = input.required<PaletteSlot>();
  public readonly colorChanged = output<PaletteColor>();


  protected copyToClipboard() {
    navigator.clipboard.writeText(this.colorHex());
  }


  protected onToggleClick(current: boolean) {
    this.colorChanged.emit({
      ...this.color(),
      isPinned: current
    });
  }


  protected showTintsAndShades() {
    this.showShades.set(true);
  }


  protected updateColor(color: Color) {
    this.showShades.set(false);
    this.colorChanged.emit({
      ...this.color(),
      color
    })
  }

}
