import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {ColorTheme} from '@common/models/color-theme.model';
import {ColorThemeService} from '@common/services/color-theme.service';


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

  private readonly colorModeService = inject(ColorThemeService);
  protected currentTheme = signal<ColorTheme>("system");


  constructor() {
    effect(() => {
      this.colorModeService.colorTheme = this.currentTheme();
    });
  }

  public ngOnInit(): void {
    this.currentTheme.set(this.colorModeService.colorTheme);
  }

}
