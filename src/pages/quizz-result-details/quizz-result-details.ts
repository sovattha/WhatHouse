import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuizzResultDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface question {
  id: number,
  text: string,
  house: string,
  answer: boolean
}

interface QuizzResult {
  userName: string,
  beginDate: Date,
  finishDate: Date,
  questions: question[]
}

@IonicPage()
@Component({
  selector: 'page-quizz-result-details',
  templateUrl: 'quizz-result-details.html',
})
export class QuizzResultDetailsPage {

  public quizzResult: QuizzResult;
  public scoreGryffondor: number;
  public scoreSerdaigle: number;
  public scorePoufsouffle: number;
  public scoreSerpentard: number;
  public message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.quizzResult = navParams.get('quizzResult');
    this.scoreGryffondor = this.getScore('Gryffondor');
    this.scoreSerdaigle = this.getScore('Serdaigle');
    this.scorePoufsouffle = this.getScore('Poufsouffle');
    this.scoreSerpentard = this.getScore('Serpentard');
    let message = 'Félicitations ' + this.quizzResult.userName + ', tu es ';
    let houses = '';
    let nbHouses = 0;
    if(this.scoreGryffondor >= this.scoreSerdaigle 
      && this.scoreGryffondor >= this.scorePoufsouffle 
      && this.scoreGryffondor >= this.scoreSerpentard) {
        houses += 'Gryffondor croisé ';
        nbHouses++;
    }
    if(this.scoreSerdaigle >= this.scoreGryffondor 
      && this.scoreSerdaigle >= this.scorePoufsouffle 
      && this.scoreSerdaigle >= this.scoreSerpentard) {
        houses += 'Serdaigle croisé ';
        nbHouses++;
    }
    if(this.scorePoufsouffle >= this.scoreSerdaigle 
      && this.scorePoufsouffle >= this.scoreGryffondor 
      && this.scorePoufsouffle >= this.scoreSerpentard) {
        houses += 'Poufsouffle croisé ';
        nbHouses++;
    }
    if(this.scoreSerpentard >= this.scoreSerdaigle 
      && this.scoreSerpentard >= this.scorePoufsouffle 
      && this.scoreSerpentard >= this.scoreGryffondor) {
        houses += 'Serpentard croisé ';
        nbHouses++;
    }
    houses = houses.substring(0, houses.length - 8);
    if(nbHouses > 1) {
      this.message = message + 'un hybride ' + houses + ' !';
    } else {
      this.message = message + 'un(e) vrai(e) ' + houses + ' !';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizzResultDetailsPage');
  }

  private getScore(category: string) {
    console.log(this.quizzResult.questions);
    return this.quizzResult.questions.filter(q => q.house === category && q.answer === true).length;
  }
}
