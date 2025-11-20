import {Component, inject} from '@angular/core';
import {PaletteStyle} from '@palettes/models/palette-style.model';
import {FormsModule} from '@angular/forms';
import {AppStateStore} from "@core/app-state.store";
import {injectDispatch} from "@ngrx/signals/events";
import {palettesEvents} from "@core/palettes/palettes.events";


@Component({
  selector: 'app-generator-style-switcher',
  imports: [
    FormsModule
  ],
  templateUrl: './generator-style-switcher.html',
  styles: ``,
})
export class GeneratorStyleSwitcher {

  readonly #stateStore = inject(AppStateStore);
  readonly #dispatch = injectDispatch(palettesEvents);

  protected readonly style = this.#stateStore.paletteStyle;
  protected readonly useRandom = this.#stateStore.useRandomStyle;


  protected useRandomChanged(value: boolean) {
    this.#dispatch.useRandomChanged(value);
  }


  protected setStyle(style: PaletteStyle) {
    this.#dispatch.styleChanged(style);
  }

}
