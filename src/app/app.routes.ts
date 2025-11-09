import {Routes} from '@angular/router';
import {Converter} from '@converter/components/converter/converter';
import {ColorPalette} from '@palettes/components/color-palette/color-palette';
import {EmptyPalette} from "@palettes/components/empty-palette/empty-palette";


export const routes: Routes = [
  {
    path: "",
    redirectTo: "/convert",
    pathMatch: "full"
  },

  {
    path: "convert",
    component: Converter,
    pathMatch: "full"
  },

  {
    path: "palettes",
    component: EmptyPalette
  },
  {
    path: "palettes/:paletteId",
    component: ColorPalette,
    title: "ColorTools – Palettes",
  }
];
