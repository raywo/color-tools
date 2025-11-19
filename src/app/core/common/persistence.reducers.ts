import {EventInstance} from "@ngrx/signals/events";
import {AppState} from "../app-state.store";
import {inject} from "@angular/core";
import {LocalStorage} from "@common/services/local-storage.service";
import {generatePalette} from "@palettes/helper/palette.helper";
import {isRestorable, paletteFromId} from "@palettes/helper/palette-id.helper";
import chroma from "chroma-js";


export function loadAppStateReducer(
  this: void,
  event: EventInstance<"[Persistence] loadAppState", void>,
  state: AppState
) {
  console.info("Loading app state from persistence ...");
  const persistence = inject(LocalStorage);

  const colorFromStorage = persistence.get("currentColor");
  const currentColor = colorFromStorage ? chroma(colorFromStorage) : chroma.random();

  const paletteId = persistence.get("currentPaletteId") ?? "";
  const restorableId = isRestorable(paletteId);
  const style = state.paletteStyle;

  return {
    colorTheme: persistence.getOrDefault("colorTheme", "dark"),
    currentColor,
    currentPalette: restorableId ? paletteFromId(paletteId) : generatePalette(style)
  }
}
