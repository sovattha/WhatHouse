import { QuizzResultDetailsPage } from './../quizz-result-details/quizz-result-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public results: QuizzResult[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
    this.storage.get('quizzes').then((value:QuizzResult[]) =>  {
      if(!value) {
        value = [];
      }
      value = value.sort((a, b) => {
        return this.getTime(new Date(a.finishDate)) - this.getTime(new Date(b.finishDate));
      });
      value = value.reverse();
      this.results = value;
    });
  }

  public seeDetails(date: Date) {
    var result = this.results.filter(r => r.finishDate == date);
    if(!result || result.length != 1) {
      let alert = this.alertCtrl.create({
        title: 'Une erreur est survenue',
        subTitle: "Ce résultat n'a pas été trouvé",
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    } 
    this.navCtrl.push(QuizzResultDetailsPage, { quizzResult: result[0] });
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
