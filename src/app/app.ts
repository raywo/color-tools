import {Component} from '@angular/core';
import {TopBar} from '@header/components/top-bar/top-bar';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [TopBar, RouterOutlet],
  templateUrl: './app.html',
  styles: ``
})
export class App {
}
