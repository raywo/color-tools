import {eventGroup} from "@ngrx/signals/events";
import {type} from "@ngrx/signals";


export const persistenceEvents = eventGroup({
  source: "Persistence",
  events: {
    loadAppState: type<void>(),
    saveAppState: type<void>()
  }
})
