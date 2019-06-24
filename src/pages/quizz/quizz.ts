import { ResultsPage } from './../results/results';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import jsonQuestions from './questions-fr.json';

export interface Question {
  id: number,
  text?: string,
  answer?: Choice,
  choices: Choice[]
}

export interface Choice {
  house: string;
  text: string;
}

@IonicPage()
@Component({
  selector: 'page-quizz',
  templateUrl: 'quizz.html',
})
export class QuizzPage {

  public $question: Subject<Question> = new Subject<Question>();
  public beginDate: Date = new Date();
  public userName: string;

  private questions: Question[] = [];
  private choices: Choice[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public storage: Storage) {
    this.userName = navParams.get('name');
    this.userName = this.userName || 'anonyme';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizzPage');
    console.log(this.userName);
    this.loadQuestions();
    this.choices = [];
    this.questions = this.shuffle(this.questions);
    this.loadNextQuestion();
    //this.storage.clear();
  }

  public questionAnswered(choice: Choice): void {
    this.choices.push(choice);
    this.loadNextQuestion();
  }

  private loadNextQuestion(): void {
    const question = this.questions[this.choices.length]; // Pick the next question
    if (!question) {
      this.saveQuizzResults();
    } else {
      this.$question.next(question);
    }
  }

  private saveQuizzResults(): void {
    this.storage.get('quizzes').then((value) => {
      if (!value) {
        value = [];
      }
      value.push({
        userName: this.userName,
        beginDate: this.beginDate,
        finishDate: new Date(),
        choices: this.choices
      });
      this.storage.set('quizzes', value).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.push(ResultsPage).then(() => {
          this.navCtrl.remove(index);
        });
      });
    });
  }

  private loadQuestions(): void {
    this.questions = jsonQuestions;
  }

  private shuffle(array: Question[]): Question[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
