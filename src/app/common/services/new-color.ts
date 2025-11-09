import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {randomBetween} from '@common/helpers/random.helper';


@Injectable({
  providedIn: 'root'
})
export class NewColor {

  private readonly _newColor = new BehaviorSubject<number>(0);
  public readonly newColor$ = this._newColor.asObservable();


  public generateNewColor() {
    this._newColor.next(randomBetween(0, 360));
  }

}
