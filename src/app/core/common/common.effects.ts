import {Events} from "@ngrx/signals/events";
import {commonEvents} from "./common.events";
import {tap} from "rxjs";
import {ColorThemeService} from "@common/services/color-theme.service";


export function colorThemeChangeEffect(
  this: void,
  events: Events,
  themeService: ColorThemeService
) {
  return events
    .on(commonEvents.colorThemeChanged)
    .pipe(
      tap(event => {
        themeService.colorTheme = event.payload
      })
    );
}
