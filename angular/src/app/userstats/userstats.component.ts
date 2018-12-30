import { Component, OnInit } from '@angular/core';
import { SleeptrackingService } from '../sleeptrackingService/sleeptracking.service';

@Component({
  selector: 'app-userstats',
  templateUrl: './userstats.component.html',
  styleUrls: ['./userstats.component.sass']
})
export class UserstatsComponent implements OnInit {
  myData;
  myColumnNames;
  myOptions;
  constructor(
    private sleeptrackingService: SleeptrackingService
  ) { }

  ngOnInit() {
    this.myData = [
      ['Ma', 10],
      ['Di', 14],
      ['Wo', 6],
      ['Do', 9],
      ['Vr', 7],
      ['Za', 9],
      ['Zo', 12]
    ];

    this.myColumnNames = ['City', 'Inhabitants'];

    this.myOptions = {
      colors: ['#FFF59D'],
    };
    this.getSleeptrackingData();
  }
  getSleeptrackingData(): void {
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let sdate = today.getDate() - i;

    }
    this.sleeptrackingService.getAllSleepTracking()
        .subscribe(data => {
          console.log(data);
        });
  }

}
