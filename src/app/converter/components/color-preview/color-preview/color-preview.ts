import {Component, inject} from '@angular/core';
import {AppStateStore} from "@core/app-state.store";


@Component({
  selector: 'app-color-preview',
  imports: [],
  templateUrl: './color-preview.html',
  styles: ``
})
export class ColorPreview {

  protected readonly currentColor = inject(AppStateStore).currentColor;

}
