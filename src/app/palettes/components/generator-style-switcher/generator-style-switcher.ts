import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ColorPaletteService} from '@palettes/services/color-palette-service';
import {PaletteStyle} from '@palettes/models/palette-style.model';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-generator-style-switcher',
  imports: [
    FormsModule
  ],
  templateUrl: './generator-style-switcher.html',
  styles: ``,
})
export class GeneratorStyleSwitcher implements OnInit, OnDestroy {

  private readonly paletteService = inject(ColorPaletteService);
  private subscription?: Subscription;

  protected readonly style = signal<PaletteStyle>("vibrant-balanced");
  protected readonly useRandom = signal(true);


  public ngOnInit() {
    this.subscription = this.paletteService.style$
      .subscribe(style => this.style.set(style));
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  protected useRandomChanged(value: boolean) {
    this.useRandom.set(value);
    this.paletteService.useRandom = value;
  }


  protected setStyle(style: PaletteStyle) {
    this.paletteService.style = style;
  }

}
