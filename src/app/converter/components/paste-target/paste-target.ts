import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ColorService} from '../../../services/color-service';
import {colorFrom} from '../../../helpers/color-format-parser.helper';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-paste-target',
  imports: [
    FormsModule
  ],
  templateUrl: './paste-target.html',
  styles: ``,
})
export class PasteTarget implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);
  private subscription?: Subscription;

  protected readonly pastedColor = signal<string | null>(null);


  public ngOnInit(): void {
    this.subscription = this.colorService.currentColor$
      .subscribe(() => this.pastedColor.set(null));
  }


  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  protected colorChanged() {
    const pastedColor = this.pastedColor();
    const color = colorFrom(pastedColor);

    if (color) {
      this.colorService.currentColor = color;
      this.pastedColor.set("");
    }
  }
}
