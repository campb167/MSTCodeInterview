import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GolfTableComponent } from './components/golf-table/golf-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GolfTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'test';
}
