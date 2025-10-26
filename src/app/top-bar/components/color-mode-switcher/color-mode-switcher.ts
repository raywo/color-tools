import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {ColorMode} from '../../../models/color-mode.model';
import {ColorModeService} from '../../../services/color-mode-service';


@Component({
  selector: 'app-color-mode-switcher',
  imports: [
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem
  ],
  templateUrl: './color-mode-switcher.html',
  styles: ``
})
export class ColorModeSwitcher implements OnInit{

  private readonly colorModeService = inject(ColorModeService);
  protected currentMode = signal<ColorMode>("system");


  constructor() {
    effect(() => {
      this.colorModeService.colorMode = this.currentMode();
    });
  }

  public ngOnInit(): void {
    this.currentMode.set(this.colorModeService.colorMode);
  }

}
