import {EventInstance} from "@ngrx/signals/events";
import {AppState} from "../app-state.store";
import {ColorTheme} from "@common/models/color-theme.model";


export function colorThemeChangedReducer(
  this: void,
  event: EventInstance<"[Common] colorThemeChanged", ColorTheme>,
  state: AppState
) {
  return {
    colorTheme: event.payload
  };
}
