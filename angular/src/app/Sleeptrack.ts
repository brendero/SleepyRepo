export class Sleeptrack {
  constructor(sleepDate: string, endDate: string, sleepHour: string, wakeHour: string) {
    this.sleep_date = sleepDate;
    this.end_date = endDate;
    this.sleep_hour = sleepHour;
    this.wake_hour = wakeHour;
  }
  sleep_date: string;
  end_date: string;
  sleep_hour: string;
  wake_hour: string;
}
