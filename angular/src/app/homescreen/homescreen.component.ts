import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.sass']
})
export class HomescreenComponent implements OnInit {
  startDate: string;
  endDate: string;
  sleepHour: string;
  wakeHour: string;
  constructor() { }

  ngOnInit() {
  }

  submitSleep(): void {
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.sleepHour);
    console.log(this.wakeHour);
  }
}
