import {Component, effect, inject, input} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {SinglePaletteColor} from '@palettes/components/single-palette-color/single-palette-color';
import {ColorPaletteService} from '@palettes/services/color-palette-service';
import {GeneratorStyleSwitcher} from '@palettes/components/generator-style-switcher/generator-style-switcher';
import {EMPTY_PALETTE, PALETTE_SLOTS} from "@palettes/models/palette.model";
import {PaletteColor} from "@palettes/models/palette-color.model";
import {generatePalette} from "@palettes/helper/palette.helper";
import {Router} from "@angular/router";


@Component({
  selector: 'app-color-palette',
  imports: [
    SinglePaletteColor,
    AsyncPipe,
    GeneratorStyleSwitcher
  ],
  templateUrl: './color-palette.html',
  styles: ``,
})
export class ColorPalette {

  private readonly paletteService = inject(ColorPaletteService);
  private readonly router = inject(Router);

  protected readonly palette$ = this.paletteService.palette$;
  protected readonly EMPTY_PALETTE = EMPTY_PALETTE;
  protected readonly PALETTE_SLOTS = PALETTE_SLOTS;

  public readonly paletteId = input.required<string>();


  constructor() {
    effect(() => {
      const paletteId = this.paletteId();
      const restorable = this.paletteService.isIdRestorable(paletteId);

      if (!paletteId || !restorable) {
        console.info("No palette to restore. Creating new one.")
        const style = this.paletteService.style;
        const palette = generatePalette(style);
        void this.router.navigate(["/palettes", palette.id]);
        return;
      }

      this.paletteService.restorePalette(paletteId);
    });
  }


  protected onColorChanged(color: PaletteColor) {
    this.paletteService.updateColor(color)
  }

}
