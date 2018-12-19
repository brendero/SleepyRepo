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
  endDate: string;
  sleepHour: string;
  wakeHour: string;
  constructor(
    private sleeptrackingService: SleeptrackingService
  ) { }

  ngOnInit() {

  }

  submitSleep(): void {
    // TODO: make a date only be posted once
    this.sleeptracking = new Sleeptrack();
    this.sleeptracking.sleep_date = this.startDate;
    this.sleeptracking.end_date = this.endDate;
    this.sleeptracking.sleep_hour = this.sleepHour;
    this.sleeptracking.wake_hour = this.wakeHour;

    this.sleeptrackingService.createSleepTracking(this.sleeptracking)
        .subscribe(data => {
          console.log(data);
        });
  }
}
