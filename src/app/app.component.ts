import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  template = '<div><img src="../assets/img/loading-icon.gif" /></div>';


  constructor() {
    setTheme('bs3');
   
  }
}
