import {Component, signal} from '@angular/core';
import {HexInput} from './components/hex-input/hex-input';
import {ColorPreview} from './components/color-preview/color-preview/color-preview';
import {RgbInput} from './components/rgb-input/rgb-input';
import {HslInput} from './components/hsl-input/hsl-input';
import {ColorSwatches} from './components/color-swatches/color-swatches';
import {BackgroundButtons} from './components/background-buttons/background-buttons';
import {ColorModeSwitcher} from './components/color-mode-switcher/color-mode-switcher';


@Component({
  selector: 'app-root',
  imports: [HexInput, ColorPreview, RgbInput, HslInput, ColorSwatches, BackgroundButtons, ColorModeSwitcher],
  templateUrl: './app.html',
  styles: ``
})
export class App {
  protected readonly title = signal('ColorTools');
}
