import {inject, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, filter, Subscription} from 'rxjs';
import chroma, {Color} from 'chroma-js';
import {NewClick} from '@common/services/new-click.service';


@Injectable({
  providedIn: 'root'
})
export class ColorService implements OnDestroy {

  private readonly newColor = inject(NewClick);
  private readonly subscription?: Subscription;

  private readonly _currentColor = new BehaviorSubject<Color>(chroma.random());
  public readonly currentColor$ = this._currentColor.asObservable();


  constructor() {
    this.subscription = this.newColor
      .newSource$
      .pipe(filter(source => source === "convert"))
      .subscribe(() => this.newRandomColor());
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


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
