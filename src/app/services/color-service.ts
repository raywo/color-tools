import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import chroma, {Color} from 'chroma-js';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private readonly _currentColor = new BehaviorSubject<Color>(chroma.random());
  public readonly currentColor$ = this._currentColor.asObservable();


  public set currentColor(color: Color) {
    console.log("Setting color to: " + color + " valid: " + chroma.valid(color) + "")
    if (chroma.valid(color)) {
      this._currentColor.next(color);
    }
  }

  public get currentColor(): Color {
    return this._currentColor.value;
  }

}
