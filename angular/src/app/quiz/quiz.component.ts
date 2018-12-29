import { Router } from '@angular/router';
import { QuizService } from './../quizservice/quiz.service';
import { AuthService } from './../authservice/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  sleep: string;
  weekend: string;
  inslapen: string;
  ochtendmodus: string;
  overdag: string;
  userId: number;
  typeId: number;
  sleepType: string;
  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getActiveUser();
  }
  getActiveUser(): void {
    this.authService.getActiveUser()
        .subscribe(userData => {
          console.log(userData);
          this.userId = userData.id;
        });
  }
  submitQuiz() {
    const total = parseInt(this.sleep) + parseInt(this.weekend) + parseInt(this.inslapen) + parseInt(this.ochtendmodus) + parseInt(this.overdag);
    this.quizService.updateQuiz(this.userId, total)
      .subscribe(
        data => {
          this.typeId = data.acf.sleeptype;
          this.showType();
        }
      );
    }
    showType(): void {
      this.sleepType = this.quizService.returnTypeQuiz(this.typeId);
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 5000);
  }

}
