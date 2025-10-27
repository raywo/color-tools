import {Component} from '@angular/core';
import {BackgroundButtons} from "../background-buttons/background-buttons";
import {ColorPreview} from "../color-preview/color-preview/color-preview";
import {ColorSwatches} from "../color-swatches/color-swatches";
import {HexInput} from "../hex-input/hex-input";
import {HslInput} from "../hsl-input/hsl-input";
import {PasteTarget} from "../paste-target/paste-target";
import {RgbInput} from "../rgb-input/rgb-input";


@Component({
  selector: 'app-converter',
  imports: [
    BackgroundButtons,
    ColorPreview,
    ColorSwatches,
    HexInput,
    HslInput,
    PasteTarget,
    RgbInput
  ],
  templateUrl: './converter.html',
  styles: ``,
})
export class Converter {

}
