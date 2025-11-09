import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ColorService} from '@converter/services/color-service';
import chroma, {Color} from 'chroma-js';
import {Subscription} from 'rxjs';
import {CopyCss} from '@converter/components/copy-css/copy-css';


@Component({
  selector: 'app-hex-input',
  imports: [
    FormsModule,
    CopyCss
  ],
  templateUrl: './hex-input.html',
  styles: ``
})
export class HexInput implements OnInit, OnDestroy {

  private readonly colorService = inject(ColorService);

  private subscription?: Subscription;
  private readonly changing = signal<boolean>(false);

  protected readonly currentColor$ = this.colorService.currentColor$;
  protected readonly hexColor = signal<string>("");

  protected readonly color = computed<Color | null>(() => {
    const hexColor = this.hexColor();

    if (!chroma.valid(hexColor)) return null;

    return chroma(hexColor);
  });


  public ngOnInit() {
    this.subscription = this.colorService.currentColor$
      .subscribe(color => {
        if (this.changing()) {
          this.changing.set(false);
          return;
        }

        this.changing.set(false);
        this.hexColor.set(color.hex().replace("#", ""));
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  protected colorChanged() {
    const color = this.color();

    if (color) {
      this.changing.set(true);
      this.colorService.currentColor = color;
    }
  }

}
