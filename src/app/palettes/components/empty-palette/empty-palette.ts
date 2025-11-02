import {Component, inject, OnInit} from '@angular/core';
import {ColorPaletteService} from "@palettes/services/color-palette-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-empty-palette',
  imports: [],
  template: ``,
  styles: ``,
})
export class EmptyPalette implements OnInit{

  private readonly paletteService = inject(ColorPaletteService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    this.paletteService.newRandomPalette();
    const id = this.paletteService.palette.id;

    void this.router.navigate(["/palettes", id]);
  }

}
