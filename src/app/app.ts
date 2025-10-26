import {Component, signal} from '@angular/core';
import {HexInput} from './converter/components/hex-input/hex-input';
import {ColorPreview} from './converter/components/color-preview/color-preview/color-preview';
import {RgbInput} from './converter/components/rgb-input/rgb-input';
import {HslInput} from './converter/components/hsl-input/hsl-input';
import {ColorSwatches} from './converter/components/color-swatches/color-swatches';
import {BackgroundButtons} from './converter/components/background-buttons/background-buttons';
import {PasteTarget} from './converter/components/paste-target/paste-target';
import {TopBar} from './top-bar/components/top-bar/top-bar';


@Component({
  selector: 'app-root',
  imports: [HexInput, ColorPreview, RgbInput, HslInput, ColorSwatches, BackgroundButtons, PasteTarget, TopBar],
  templateUrl: './app.html',
  styles: ``
})
export class App {
  protected readonly title = signal('ColorTools');
}
