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
    if (chroma.valid(color)) {
      this._currentColor.next(color);
    }
  }


  public get currentColor(): Color {
    return this._currentColor.value;
  }


  public newRandomColor() {
    this.currentColor = chroma.random();
  }

}
