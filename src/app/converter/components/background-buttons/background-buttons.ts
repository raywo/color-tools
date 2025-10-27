import {Component, DOCUMENT, inject, OnDestroy, signal} from '@angular/core';
import {ColorService} from '../../services/color-service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-background-buttons',
  imports: [],
  templateUrl: './background-buttons.html',
  styles: ``
})
export class BackgroundButtons implements OnDestroy {

  private readonly colorService = inject(ColorService);
  private readonly document = inject(DOCUMENT);

  private subscription?: Subscription;

  protected readonly useBackground = signal(false);


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  protected useAsBackground() {
    this.useBackground.set(true);
    this.subscription?.unsubscribe();
    this.subscription = this.colorService.currentColor$
      .subscribe(color => {
        this.document.body.style = `--ct-body-bg: ${color.hex()};`;
      });
  }


  protected restoreBackground() {
    this.useBackground.set(false);
    this.subscription?.unsubscribe();
    this.document.body.style = "";
  }

}
