import {Component, computed, input, output} from '@angular/core';
import ColorNamer from 'color-namer';
import {contrastingColor, contrastingMutedColor} from '@common/helpers/contrasting-color.helper';
import {ToggleButton} from '@common/components/toggle-button/toggle-button';
import {PaletteColor} from "@palettes/models/palette-color.model";
import {PaletteSlot} from "@palettes/models/palette.model";


@Component({
  selector: 'app-single-palette-color',
  imports: [
    ToggleButton
  ],
  templateUrl: './single-palette-color.html',
  styles: ``,
})
export class SinglePaletteColor {

  protected readonly colorName = computed(() => {
    const names = ColorNamer(this.color().color.hex());
    const allColors = Object.values(names)
      .flat()
      .sort((a, b) => a.distance - b.distance);

    if (!allColors.length) return "Unknown";

    const bestOverall = allColors[0];

    const pantoneList = names.pantone;
    const bestPantone = pantoneList.length ?
      pantoneList.sort((a, b) => a.distance - b.distance)[0]
      : undefined;

    if (bestPantone && bestPantone.distance <= bestOverall.distance + 5) {
      return bestPantone.name;
    }

    return bestOverall.name;
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
  })


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

}
