import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SleeptrackingService } from './../sleeptrackingService/sleeptracking.service';
import { Sleeptrack } from './../Sleeptrack';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.sass']
})
export class HomescreenComponent implements OnInit {
  sleeptracking: Sleeptrack;
  startDate: string;
  sleepHour: string;
  wakeHour: string;
  constructor(
    private sleeptrackingService: SleeptrackingService,
    private location: Location
  ) { }

  ngOnInit() {

  }

  submitSleep(): void {
    let endDate;
    if (this.wakeHour < this.sleepHour) {
      const sdate = new Date(this.startDate);
      sdate.setDate(sdate.getDate() + 1);
      endDate = `${sdate.getFullYear()}-${sdate.getMonth() + 1}-${sdate.getDate()}`;
    } else {
      endDate = this.startDate;
    }

    this.sleeptracking = new Sleeptrack(this.startDate, endDate, this.sleepHour, this.wakeHour);

    this.sleeptrackingService.createSleepTracking(this.sleeptracking)
        .subscribe(() => {
          window.location.reload();
        });
  }
}
