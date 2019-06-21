import { ResultsPage } from './../results/results';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';

interface question {
  id: number,
  text: string,
  house: string,
  answer: boolean
}

@IonicPage()
@Component({
  selector: 'page-quizz',
  templateUrl: 'quizz.html',
})
export class QuizzPage {

  public currentQuestionId: number;
  public $questionText: Subject<string> = new Subject<string>();
  public beginDate: Date = new Date();
  public userName: string;

  private questions: question[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public storage: Storage) {
      this.userName = navParams.get('name');
      if(!this.userName || this.userName === '') {
        this.userName = 'anonyme';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizzPage');
    console.log(this.userName);
    this.loadQuestions();
    this.loadNextQuestion();
    //this.storage.clear();
  }

  public questionAnswered(answer: boolean): void {
    this.questions.filter(q => q.id === this.currentQuestionId)[0].answer = answer;
    this.loadNextQuestion();
  }

  private loadNextQuestion(): void {
    const question = this.getRandomQuestion();
    if(!question) {
      this.saveQuizzResults();
    } else {
      this.$questionText.next(question.text);
      this.currentQuestionId = question.id;
    }
  }

  private getRandomQuestion(): question {
    const unansweredQuestions = this.questions.filter(q => q.answer == null);
    if(unansweredQuestions.length === 0) {
      return null;
    }
    
    console.log(unansweredQuestions.length + ' éléments restants');
    const random = Math.floor(Math.random() * unansweredQuestions.length);
    console.log(random + ' élément sélectionné');
    const currentQuestion = unansweredQuestions[random];
    return currentQuestion;
  }

  private saveQuizzResults(): void { 
    this.storage.get('quizzes').then((value) =>  {
      if(!value) {
        value = [];
      }
      value.push({ userName: this.userName, beginDate: this.beginDate, finishDate: new Date(), questions: this.questions });
      this.storage.set('quizzes', value).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.push(ResultsPage).then(() => {
          this.navCtrl.remove(index);
        });
      });
    });
  }

  private loadQuestions(): void {
    this.questions = [];
    this.questions.push({ id: 0, house: 'Gryffondor', text: "You're the type to get into roadtrips or spontaneous trips", answer: null });
    this.questions.push({ id: 1, house: 'Gryffondor', text: "You like alcohol", answer: null });
    this.questions.push({ id: 2, house: 'Gryffondor', text: "You tend to bite your lips", answer: null });
    this.questions.push({ id: 3, house: 'Gryffondor', text: "You talk to your friends during class", answer: null });
    this.questions.push({ id: 4, house: 'Gryffondor', text: "Your favorite season is summer", answer: null });
    this.questions.push({ id: 5, house: 'Gryffondor', text: "You are a bad loser", answer: null });
    this.questions.push({ id: 6, house: 'Gryffondor', text: "You're addicted to adrenaline", answer: null });
    this.questions.push({ id: 7, house: 'Gryffondor', text: "You insult (to mess with) your friends", answer: null });
    this.questions.push({ id: 8, house: 'Gryffondor', text: "You are unable to keep your pokerface", answer: null });
    this.questions.push({ id: 9, house: 'Gryffondor', text: "Having lots of homework to do does not scare you", answer: null });
    this.questions.push({ id: 10, house: 'Gryffondor', text: "You're the type to sit on the tables", answer: null });
    this.questions.push({ id: 11, house: 'Gryffondor', text: "You like loud music", answer: null });
    this.questions.push({ id: 12, house: 'Gryffondor', text: "You procrastinate all the time", answer: null });
    this.questions.push({ id: 13, house: 'Gryffondor', text: "You like dirty jokes", answer: null });
    this.questions.push({ id: 14, house: 'Gryffondor', text: "You love when someone wears a lot of makeup", answer: null });
    this.questions.push({ id: 15, house: 'Gryffondor', text: "You are athletic", answer: null });
    this.questions.push({ id: 16, house: 'Gryffondor', text: "You win all the quarrels / debates", answer: null });
    this.questions.push({ id: 17, house: 'Gryffondor', text: "You have already tried several hair colors", answer: null });
    this.questions.push({ id: 18, house: 'Gryffondor', text: "You swear a lot", answer: null });
    this.questions.push({ id: 19, house: 'Gryffondor', text: "Friends> everything else", answer: null });
    this.questions.push({ id: 20, house: 'Gryffondor', text: "A storm is so beautiful", answer: null });
    this.questions.push({ id: 21, house: 'Gryffondor', text: "You like to play with fire (literally)", answer: null });
    this.questions.push({ id: 22, house: 'Gryffondor', text: "You never get bored", answer: null });
    this.questions.push({ id: 23, house: 'Gryffondor', text: "Your favorite color is red", answer: null });
    this.questions.push({ id: 24, house: 'Gryffondor', text: "You always like to climb trees", answer: null });

    this.questions.push({ id: 100, house: 'Poufsouffle', text: "You like hoodies too big", answer: null });
    this.questions.push({ id: 101, house: 'Poufsouffle', text: "Animals are your friends", answer: null });
    this.questions.push({ id: 102, house: 'Poufsouffle', text: "You love everyone or almost", answer: null });
    this.questions.push({ id: 103, house: 'Poufsouffle', text: "You hum songs when you prepare", answer: null });
    this.questions.push({ id: 104, house: 'Poufsouffle', text: "You always greet everyone", answer: null });
    this.questions.push({ id: 105, house: 'Poufsouffle', text: "You make the best hugs", answer: null });
    this.questions.push({ id: 106, house: 'Poufsouffle', text: "You are very ticklish", answer: null });
    this.questions.push({ id: 107, house: 'Poufsouffle', text: "You like to collect stuff", answer: null });
    this.questions.push({ id: 108, house: 'Poufsouffle', text: "You know how to cook", answer: null });
    this.questions.push({ id: 109, house: 'Poufsouffle', text: "You like to listen to old tubes", answer: null });
    this.questions.push({ id: 110, house: 'Poufsouffle', text: "You share your food without hesitation", answer: null });
    this.questions.push({ id: 111, house: 'Poufsouffle', text: "You always know what to say", answer: null });
    this.questions.push({ id: 112, house: 'Poufsouffle', text: "Your favorite season is autumn", answer: null });
    this.questions.push({ id: 113, house: 'Poufsouffle', text: "You laugh at everything", answer: null });
    this.questions.push({ id: 114, house: 'Poufsouffle', text: "You like to play Super Mario", answer: null });
    this.questions.push({ id: 115, house: 'Poufsouffle', text: "You are patient", answer: null });
    this.questions.push({ id: 116, house: 'Poufsouffle', text: "You like sweets", answer: null });
    this.questions.push({ id: 117, house: 'Poufsouffle', text: "You fall easily in love", answer: null });
    this.questions.push({ id: 118, house: 'Poufsouffle', text: "You are the type to wear / you prefer ultra discreet makeup", answer: null });
    this.questions.push({ id: 119, house: 'Poufsouffle', text: "You like the picture", answer: null });
    this.questions.push({ id: 120, house: 'Poufsouffle', text: "You think the autumn leaves are too good", answer: null });
    this.questions.push({ id: 121, house: 'Poufsouffle', text: "You are a romantic without hope", answer: null });
    this.questions.push({ id: 122, house: 'Poufsouffle', text: "You like knitted blankets and clothes", answer: null });
    this.questions.push({ id: 123, house: 'Poufsouffle', text: "Your favorite color is yellow", answer: null });
    this.questions.push({ id: 124, house: 'Poufsouffle', text: "You can spend the day chaining TV shows", answer: null });

    this.questions.push({ id: 200, house: 'Serdaigle', text: "You like to learn new languages", answer: null });
    this.questions.push({ id: 201, house: 'Serdaigle', text: "You pay attention to details", answer: null });
    this.questions.push({ id: 202, house: 'Serdaigle', text: "You like reading books", answer: null });
    this.questions.push({ id: 203, house: 'Serdaigle', text: "Your writing is clean and pretty", answer: null });
    this.questions.push({ id: 204, house: 'Serdaigle', text: "Your favorite season is winter", answer: null });
    this.questions.push({ id: 205, house: 'Serdaigle', text: "You like the smell of new books", answer: null });
    this.questions.push({ id: 206, house: 'Serdaigle', text: "You prefer / wear or little makeup", answer: null });
    this.questions.push({ id: 207, house: 'Serdaigle', text: "You like the hair tied in a ponytail", answer: null });
    this.questions.push({ id: 208, house: 'Serdaigle', text: "You master the art of walking while reading", answer: null });
    this.questions.push({ id: 209, house: 'Serdaigle', text: "You correct the grammar of others", answer: null });
    this.questions.push({ id: 210, house: 'Serdaigle', text: "You sing in the shower", answer: null });
    this.questions.push({ id: 211, house: 'Serdaigle', text: "You play an instrument", answer: null });
    this.questions.push({ id: 212, house: 'Serdaigle', text: "You have a playlist to study / work", answer: null });
    this.questions.push({ id: 213, house: 'Serdaigle', text: "You stay up late", answer: null });
    this.questions.push({ id: 214, house: 'Serdaigle', text: "You could spend the day at the library", answer: null });
    this.questions.push({ id: 215, house: 'Serdaigle', text: "You're always on time", answer: null });
    this.questions.push({ id: 216, house: 'Serdaigle', text: "You like trendy coats", answer: null });
    this.questions.push({ id: 217, house: 'Serdaigle', text: "You like to discover cute little coffee shops", answer: null });
    this.questions.push({ id: 218, house: 'Serdaigle', text: "You like word games", answer: null });
    this.questions.push({ id: 219, house: 'Serdaigle', text: "You often think too much about many subjects", answer: null });
    this.questions.push({ id: 220, house: 'Serdaigle', text: "You think that space is beautiful", answer: null });
    this.questions.push({ id: 221, house: 'Serdaigle', text: "You like myths and legends", answer: null });
    this.questions.push({ id: 222, house: 'Serdaigle', text: "You love the architecture of the Renaissance", answer: null });
    this.questions.push({ id: 223, house: 'Serdaigle', text: "Your favorite color is blue", answer: null });
    this.questions.push({ id: 224, house: 'Serdaigle', text: "Books are always better than movies", answer: null });

    this.questions.push({ id: 300, house: 'Serpentard', text: "You like lipstick", answer: null });
    this.questions.push({ id: 301, house: 'Serpentard', text: "Sarcasm is your thing", answer: null });
    this.questions.push({ id: 302, house: 'Serpentard', text: "You have few friends, but they are very close friends", answer: null });
    this.questions.push({ id: 303, house: 'Serpentard', text: "You like horror movies", answer: null });
    this.questions.push({ id: 304, house: 'Serpentard', text: "The family is very important", answer: null });
    this.questions.push({ id: 305, house: 'Serpentard', text: "Your favorite season is spring", answer: null });
    this.questions.push({ id: 306, house: 'Serpentard', text: "You like leather jackets", answer: null });
    this.questions.push({ id: 307, house: 'Serpentard', text: "You often drink tea", answer: null });
    this.questions.push({ id: 308, house: 'Serpentard', text: "You do not do what others expect from you", answer: null });
    this.questions.push({ id: 309, house: 'Serpentard', text: "You love traditions", answer: null });
    this.questions.push({ id: 310, house: 'Serpentard', text: "Quality> Quantity", answer: null });
    this.questions.push({ id: 311, house: 'Serpentard', text: "You like turtlenecks", answer: null });
    this.questions.push({ id: 312, house: 'Serpentard', text: "You never forget anything", answer: null });
    this.questions.push({ id: 313, house: 'Serpentard', text: "You like to take advantage of your actions", answer: null });
    this.questions.push({ id: 314, house: 'Serpentard', text: "Saturday> Friday", answer: null });
    this.questions.push({ id: 315, house: 'Serpentard', text: "You love luxury brands", answer: null });
    this.questions.push({ id: 316, house: 'Serpentard', text: "Sometimes you are in love with 10 people at a time", answer: null });
    this.questions.push({ id: 317, house: 'Serpentard', text: "A lie to protect the other is ok", answer: null });
    this.questions.push({ id: 318, house: 'Serpentard', text: "You like to travel by plane", answer: null });
    this.questions.push({ id: 319, house: 'Serpentard', text: "You follow the news on TV", answer: null });
    this.questions.push({ id: 320, house: 'Serpentard', text: "You find that gems / precious stones are beautiful", answer: null });
    this.questions.push({ id: 321, house: 'Serpentard', text: "You like spicy food", answer: null });
    this.questions.push({ id: 322, house: 'Serpentard', text: "You never let your emotions show", answer: null });
    this.questions.push({ id: 323, house: 'Serpentard', text: "Your favorite color is green", answer: null });
    this.questions.push({ id: 324, house: 'Serpentard', text: "You have a lot of secrets", answer: null });
  }
}
