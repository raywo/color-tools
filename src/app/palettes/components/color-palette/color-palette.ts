import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {SinglePaletteColor} from '@palettes/components/single-palette-color/single-palette-color';
import {ColorPaletteService} from '@palettes/services/color-palette-service';
import {GeneratorStyleSwitcher} from '@palettes/components/generator-style-switcher/generator-style-switcher';


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

  protected readonly palette$ = this.paletteService.palette$;

}
