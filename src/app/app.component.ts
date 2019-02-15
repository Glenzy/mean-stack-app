import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-posts></app-posts>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My MEAN Stack';
}
