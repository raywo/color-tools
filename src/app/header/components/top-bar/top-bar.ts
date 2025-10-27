import {Component, inject} from '@angular/core';
import {ColorModeSwitcher} from '../color-mode-switcher/color-mode-switcher';
import {ColorService} from '../../../converter/services/color-service';
import {RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'nav[app-top-bar]',
  imports: [
    ColorModeSwitcher,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './top-bar.html',
  styles: ``,
  host: {
    "class": "navbar navbar-expand"
  }
})
export class TopBar {

  private readonly colorService = inject(ColorService);

  protected newRandomColor() {
    this.colorService.newRandomColor();
  }

}
