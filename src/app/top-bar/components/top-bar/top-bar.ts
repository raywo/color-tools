import {Component, inject} from '@angular/core';
import {ColorModeSwitcher} from '../color-mode-switcher/color-mode-switcher';
import {ColorService} from '../../../services/color-service';


@Component({
  selector: 'header[app-top-bar]',
  imports: [
    ColorModeSwitcher
  ],
  templateUrl: './top-bar.html',
  styles: ``,
  host: {
    "class": "title-bar"
  }
})
export class TopBar {

  private readonly colorService = inject(ColorService);

  protected newRandomColor() {
    this.colorService.newRandomColor();
  }

}
