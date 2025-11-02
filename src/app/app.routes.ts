import {Routes} from '@angular/router';
import {Converter} from '@converter/components/converter/converter';
import {ColorPalette} from '@palettes/components/color-palette/color-palette';


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
    component: ColorPalette,
    pathMatch: "full"
  }
];
