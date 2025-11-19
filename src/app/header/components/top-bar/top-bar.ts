import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ColorModeSwitcher} from '@header/components/color-mode-switcher/color-mode-switcher';
import {EventType, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NewClick} from '@common/services/new-click.service';
import {filter, map, Subscription} from "rxjs";
import {LocalStorage} from "@common/services/local-storage";
import {AsyncPipe} from "@angular/common";
import {NewClickSource, routePathToSource} from "@common/models/new-click-source.model";


@Component({
  selector: 'nav[app-top-bar]',
  imports: [
    ColorModeSwitcher,
    RouterLinkActive,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './top-bar.html',
  styles: ``,
  host: {
    "class": "navbar navbar-expand"
  }
})
export class TopBar implements OnInit, OnDestroy {

  private readonly router = inject(Router);
  private readonly newClick = inject(NewClick);
  private readonly settings = inject(LocalStorage);

  private subscription?: Subscription;
  private newClickSource: NewClickSource = "convert";

  protected readonly triggerNewCaption = signal("New random color");
  protected readonly paletteId$ = this.settings.get$("currentPaletteId");


  public ngOnInit() {
    this.subscription = this.router.events
      .pipe(
        filter(event => event.type === EventType.NavigationEnd),
        map(event => event.urlAfterRedirects)
      )
      .subscribe(path => {
        this.newClickSource = routePathToSource(path);

        if (this.newClickSource === "palettes") {
          this.triggerNewCaption.set("New palette");
          return;
        }

        this.triggerNewCaption.set("New color");
      });
  }


  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  protected triggerNew() {
    this.newClick.triggerNew(this.newClickSource);
  }

}
