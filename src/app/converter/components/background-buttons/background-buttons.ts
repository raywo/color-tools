import {Component, inject} from '@angular/core';
import {injectDispatch} from "@ngrx/signals/events";
import {converterEvents} from "@core/converter/converter.events";
import {AppStateStore} from "@core/app-state.store";


@Component({
  selector: 'app-background-buttons',
  imports: [],
  templateUrl: './background-buttons.html',
  styles: ``
})
export class BackgroundButtons {

  readonly #stateStore = inject(AppStateStore);
  readonly #dispatch = injectDispatch(converterEvents);


  protected readonly useBackground = this.#stateStore.useAsBackground;


  protected useAsBackground() {
    this.#dispatch.useAsBackgroundChanged(true);
  }


  protected restoreBackground() {
    this.#dispatch.useAsBackgroundChanged(false);
  }

}
