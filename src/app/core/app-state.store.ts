import chroma, {Color} from "chroma-js";
import {Palette} from "@palettes/models/palette.model";
import {PaletteStyle} from "@palettes/models/palette-style.model";
import {ColorSpace} from "@common/models/color-space.model";
import {generatePalette} from "@palettes/helper/palette.helper";
import {signalStore, withState} from "@ngrx/signals";
import {converterEvents} from "./converter/converter.events";
import {Events, on, withEffects, withReducer} from "@ngrx/signals/events";
import {colorChangedReducer} from "./converter/converter.reducers";
import {inject} from "@angular/core";
import {LocalStorage} from "@common/services/local-storage.service";
import {map} from "rxjs";
import {persistenceEvents} from "./common/persistence.events";
import {palettesEvents} from "./palettes/palettes.events";
import {ColorTheme} from "@common/models/color-theme.model";
import {loadAppStateReducer} from "./common/persistence.reducers";
import {commonEvents} from "./common/common.events";
import {colorThemeChangedReducer} from "./common/common.reducers";
import {ColorThemeService} from "@common/services/color-theme.service";
import {colorThemeChangeEffect} from "./common/common.effects";
import {saveStateEffect} from "./common/persistence.effects";


export type AppState = {
  // Converter related
  currentColor: Color;
  useAsBackground: boolean;
  correctLightness: boolean;
  useBezier: boolean;
  displayColorSpace: ColorSpace;

  // Palette related
  paletteStyle: PaletteStyle;
  useRandomStyle: boolean;
  currentPalette: Palette;

  // Common
  colorTheme: ColorTheme;
}

const initialState: AppState = {
  currentColor: chroma.random(),
  useAsBackground: false,
  correctLightness: true,
  useBezier: true,
  displayColorSpace: "hsl",

  paletteStyle: "muted-analog-split",
  useRandomStyle: false,
  currentPalette: generatePalette("muted-analog-split"),

  colorTheme: "system"
};

export const AppStateStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withReducer(
    on(persistenceEvents.loadAppState, loadAppStateReducer),
    on(commonEvents.colorThemeChanged, colorThemeChangedReducer),
    on(converterEvents.colorChanged, colorChangedReducer)
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      localStorageService = inject(LocalStorage),
      themeService = inject(ColorThemeService)
    ) => ({
      setColorTheme$: colorThemeChangeEffect(events, themeService),

      anyPersistableEvents$: events
        .on(
          commonEvents.colorThemeChanged,
          converterEvents.colorChanged,
          palettesEvents.paletteChanged
        )
        .pipe(
          map(() => persistenceEvents.saveAppState())
        ),

      persist$: saveStateEffect(events, localStorageService, store)
    })
  )
);

export type AppStateStore = InstanceType<typeof AppStateStore>;
