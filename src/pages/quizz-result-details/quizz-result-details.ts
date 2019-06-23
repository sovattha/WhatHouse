import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Choice } from "../quizz/quizz";

interface QuizzResult {
  userName: string,
  beginDate: Date,
  finishDate: Date,
  choices: Choice[]
}

@IonicPage()
@Component({
  selector: 'page-quizz-result-details',
  templateUrl: 'quizz-result-details.html',
})
export class QuizzResultDetailsPage {

  public quizzResult: QuizzResult;
  public scoreBlue: number;
  public scoreRed: number;
  public scoreGreen: number;
  public scoreYellow: number;
  public message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.quizzResult = navParams.get('quizzResult');
    this.scoreBlue = this.getScore('blue');
    this.scoreRed = this.getScore('red');
    this.scoreGreen = this.getScore('green');
    this.scoreYellow = this.getScore('yellow');
    let houses = '';
    let nbHouses = 0;
    if(this.scoreBlue >= this.scoreRed
      && this.scoreBlue >= this.scoreGreen
      && this.scoreBlue >= this.scoreYellow) {
        houses += 'Blue mixed';
        nbHouses++;
    }
    if(this.scoreRed >= this.scoreBlue
      && this.scoreRed >= this.scoreGreen
      && this.scoreRed >= this.scoreYellow) {
        houses += 'Red mixed';
        nbHouses++;
    }
    if(this.scoreGreen >= this.scoreRed
      && this.scoreGreen >= this.scoreBlue
      && this.scoreGreen >= this.scoreYellow) {
        houses += 'Green mixed';
        nbHouses++;
    }
    if(this.scoreYellow >= this.scoreRed
      && this.scoreYellow >= this.scoreGreen
      && this.scoreYellow >= this.scoreBlue) {
        houses += 'Yellow mixed';
        nbHouses++;
    }
    houses = houses.replace(' mixed', '');
    if(nbHouses > 1) {
      this.message = 'an hybrid ' + houses + ' !';
    } else {
      this.message = 'a real ' + houses + ' !';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizzResultDetailsPage');
  }

  private getScore(category: string) {
    console.log(this.quizzResult);
    return this.quizzResult.choices.filter(q => q.house === category).length;
  }
}
