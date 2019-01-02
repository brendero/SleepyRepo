import { Component, OnInit } from '@angular/core';
import { SleeptrackingService } from '../sleeptrackingService/sleeptracking.service';
import { count } from 'rxjs/operators';

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
    this.myData = [];

    this.myColumnNames = ['Hours', 'Hours slept'];

    this.myOptions = {
      isStacked: true,
      height: 400,
      width: 300,
      colors: ['#FFF59D'],
      legend: {position: 'top'}
    };
    this.getSleeptrackingData();
  }
  getSleeptrackingData(): void {
    const today = new Date();
    const lastWeek = new Date();

    lastWeek.setDate(today.getDate() - 6);

    const startDate = `${lastWeek.getFullYear()}-${lastWeek.getMonth() + 1}-${lastWeek.getDate()}`;
    const endDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    this.sleeptrackingService.getSleepTrackingBetweenDates(startDate, endDate)
    .subscribe(sleeptrack => {
      const dateArray = new Map();
      sleeptrack.forEach(element => {
          const value =  dateArray.get(element.sleep_date[0]);

          if (!value) {
            dateArray.set(element.sleep_date[0], [(24 - parseInt(element.sleep_hour[0]))]);
          } else {
            value.push((24 - parseInt(element.sleep_hour[0])));
          }

          const endValue = dateArray.get(element.end_date[0]);
          if (!endValue) {
            dateArray.set(element.end_date[0], [parseInt(element.wake_hour[0])] );
          } else {
            endValue.push(parseInt(element.wake_hour[0]));
          }
      });
      for (let i = 0; i < 7; i++) {
        const sdate = new Date();

        sdate.setDate(lastWeek.getDate() + i);
        const currentDateFormat = `${sdate.getFullYear()}-${sdate.getMonth() + 1}-${sdate.getDate()}`;
        const sleepingData = dateArray.get(currentDateFormat);
        let totalHours = 0;
        if (sleepingData !== undefined) {
          sleepingData.forEach(element => {
            totalHours += element;
          });
        }
        this.myData.push([sdate.toLocaleString('nl-nl', {weekday: 'short'}), totalHours]);
      }

    });

  }

}
