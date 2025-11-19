import {eventGroup} from "@ngrx/signals/events";
import {type} from "@ngrx/signals";
import {ColorTheme} from "@common/models/color-theme.model";


export const commonEvents = eventGroup({
  source: "Common",
  events: {
    colorThemeChanged: type<ColorTheme>()
  }
})
