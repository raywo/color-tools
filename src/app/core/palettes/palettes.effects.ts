import {Events} from "@ngrx/signals/events";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {AppStateStore} from "@core/app-state.store";
import {palettesEvents} from "@core/palettes/palettes.events";


export function navigateToPaletteIdEffect(
  this: void,
  events: Events,
  router: Router,
  store: unknown
) {
  const typedStore = store as AppStateStore;

  return events
    .on(
      palettesEvents.newRandomPalette,
      palettesEvents.updatePaletteColor
    )
    .pipe(
      tap(event => {
        const palette = typedStore.currentPalette();
        void router.navigate(["/palettes", palette.id]);
      })
    );
}
