import {Component, inject, input} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ColorService} from '@converter/services/color-service';
import {ColorSpace} from '@common/models/color-space.model';
import {map} from 'rxjs';


@Component({
  selector: 'div[app-copy-css]',
  imports: [
    AsyncPipe
  ],
  templateUrl: './copy-css.html',
  styles: ``,
  host: {
    "class": "input-css-copy"
  }
})
export class CopyCss {

  protected readonly cssToDisplay$ = inject(ColorService)
    .currentColor$
    .pipe(
      map(color => {
        switch (this.colorMode()) {
          case "hex":
            return color.hex();
          case "rgb":
            return color.css("rgb");
          case "hsl":
            return color.css("hsl");
          default:
            return color.hex();
        }
      })
    );


  public readonly colorMode = input.required<ColorSpace>();


  protected copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

}
