import {Component, inject} from '@angular/core';
import {ColorService} from '../../../../services/color-service';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-color-preview',
  imports: [
    AsyncPipe
  ],
  templateUrl: './color-preview.html',
  styles: ``
})
export class ColorPreview {

  protected readonly currentColor$ = inject(ColorService).currentColor$;

}
