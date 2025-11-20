import {EventInstance} from "@ngrx/signals/events";
import {ColorTheme} from "@common/models/color-theme.model";
import {AppState} from "@core/models/app-state.model";


export function colorThemeChangedReducer(
  this: void,
  event: EventInstance<"[Common] colorThemeChanged", ColorTheme>,
  state: AppState
) {
  return {
    colorTheme: event.payload
  };
}
