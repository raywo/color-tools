import {eventGroup} from "@ngrx/signals/events";
import {type} from "@ngrx/signals";
import {Palette} from "@palettes/models/palette.model";


export const palettesEvents = eventGroup({
  source: "Palettes",
  events: {
    paletteChanged: type<Palette>()
  }
})
