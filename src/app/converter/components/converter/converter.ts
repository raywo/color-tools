import {Component} from '@angular/core';
import {BackgroundButtons} from "@converter/components/background-buttons/background-buttons";
import {ColorPreview} from "@converter/components/color-preview/color-preview/color-preview";
import {ColorSwatches} from "@converter/components/color-swatches/color-swatches";
import {HexInput} from "@converter/components/hex-input/hex-input";
import {HslInput} from "@converter/components/hsl-input/hsl-input";
import {PasteTarget} from "@converter/components/paste-target/paste-target";
import {RgbInput} from "@converter/components/rgb-input/rgb-input";


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
