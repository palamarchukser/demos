import { Component } from '@angular/core';

@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  })

export class AppComponent {
  public items: Array<string> = ['item1', 'item2', 'item3'];

  public title = 'WebSocket';

  public open(event: Event, item: string) {
    alert(`Open ${item}`);
  }
}
