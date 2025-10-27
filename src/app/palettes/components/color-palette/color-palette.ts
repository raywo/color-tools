import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {SinglePaletteColor} from '@palettes/components/single-palette-color/single-palette-color';
import {ColorPaletteService} from '@palettes/services/color-palette-service';


@Component({
  selector: 'app-color-palette',
  imports: [
    SinglePaletteColor,
    AsyncPipe
  ],
  templateUrl: './color-palette.html',
  styles: ``,
})
export class ColorPalette implements OnInit {

  private readonly paletteService = inject(ColorPaletteService);

  protected readonly palette$ = this.paletteService.palette$;


  public ngOnInit() {
    this.paletteService.newRandomPalette();
  }

}
