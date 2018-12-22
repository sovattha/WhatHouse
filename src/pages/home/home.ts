import { ResultsPage } from './../results/results';
import { QuizzPage } from './../quizz/quizz';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  public startQuizz(name: string): void {
    this.navCtrl.push(QuizzPage, { name: name });
  }

  public seeResults() : void {
    this.navCtrl.push(ResultsPage);
  }
}
