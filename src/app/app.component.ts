import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-d3-charts';

  data = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 15 },
    { name: 'D', value: 5 },
    { name: 'E', value: 25 },
  ];

  options = {
    width: 600,
    height: 400,
    margin: { top: 20, right: 20, bottom: 40, left: 40 },
    colorScheme: ['blue', 'green', 'red', 'purple', 'orange'],
    xAxisLabel: 'Name',
    yAxisLabel: 'Value',
  };
}
