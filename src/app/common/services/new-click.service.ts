import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NewClickSource} from "@common/models/new-click-source.model";


@Injectable({
  providedIn: 'root'
})
export class NewClick {

  private readonly _newSource = new BehaviorSubject<NewClickSource>("convert");
  public readonly newSource$ = this._newSource.asObservable();


  public triggerNew(source: NewClickSource) {
    this._newSource.next(source);
  }

}
