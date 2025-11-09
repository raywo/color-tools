import {Component, inject} from '@angular/core';
import {ColorModeSwitcher} from '@header/components/color-mode-switcher/color-mode-switcher';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NewColor} from '@common/services/new-color';


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

  private readonly newColor = inject(NewColor);


  protected newRandomColor() {
    this.newColor.generateNewColor();
  }

}
