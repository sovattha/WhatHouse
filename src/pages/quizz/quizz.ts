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
    this.questions.push({ id: 0, house: 'Gryffondor', text: "Tu es du genre à te lancer dans des roadtrips ou voyages spontanés", answer: null });
    this.questions.push({ id: 1, house: 'Gryffondor', text: "Tu aimes l'alcool", answer: null });
    this.questions.push({ id: 2, house: 'Gryffondor', text: "Tu as tendance à te mordre les lèvres", answer: null });
    this.questions.push({ id: 3, house: 'Gryffondor', text: "Tu parles à tes copains pendant les cours", answer: null });
    this.questions.push({ id: 4, house: 'Gryffondor', text: "Ta saison préférée c'est l'été", answer: null });
    this.questions.push({ id: 5, house: 'Gryffondor', text: "Tu es mauvais perdant", answer: null });
    this.questions.push({ id: 6, house: 'Gryffondor', text: "Tu es accro à l'adrénaline", answer: null });
    this.questions.push({ id: 7, house: 'Gryffondor', text: "Tu insultes (pour déconner) tes amis", answer: null });
    this.questions.push({ id: 8, house: 'Gryffondor', text: "Tu es incapable de garder ta pokerface", answer: null });
    this.questions.push({ id: 9, house: 'Gryffondor', text: "Avoir beaucoup de devoirs à faire ne te fait pas peur", answer: null });
    this.questions.push({ id: 10, house: 'Gryffondor', text: "Tu es du genre à t'assoir sur les tables", answer: null });
    this.questions.push({ id: 11, house: 'Gryffondor', text: "Tu aimes la musique forte", answer: null });
    this.questions.push({ id: 12, house: 'Gryffondor', text: "Tu procrastines tout le temps", answer: null });
    this.questions.push({ id: 13, house: 'Gryffondor', text: "Tu aimes les blagues salaces", answer: null });
    this.questions.push({ id: 14, house: 'Gryffondor', text: "Tu aimes quand quelqu'un porte beaucoup de maquillage", answer: null });
    this.questions.push({ id: 15, house: 'Gryffondor', text: "Tu es athlétique", answer: null });
    this.questions.push({ id: 16, house: 'Gryffondor', text: "Tu gagnes toutes les querelles/débats ", answer: null });
    this.questions.push({ id: 17, house: 'Gryffondor', text: "Tu as déjà essayé plusieurs couleurs de cheveux", answer: null });
    this.questions.push({ id: 18, house: 'Gryffondor', text: "Tu jures beaucoup", answer: null });
    this.questions.push({ id: 19, house: 'Gryffondor', text: "Amis > tout le reste", answer: null });
    this.questions.push({ id: 20, house: 'Gryffondor', text: "Un orage c'est tellement beau", answer: null });
    this.questions.push({ id: 21, house: 'Gryffondor', text: "Tu aimes jouer avec le feu (littéralement)", answer: null });
    this.questions.push({ id: 22, house: 'Gryffondor', text: "Tu  ne t'ennuies jamais", answer: null });
    this.questions.push({ id: 23, house: 'Gryffondor', text: "Ta couleur préférée c'est le rouge", answer: null });
    this.questions.push({ id: 24, house: 'Gryffondor', text: "Tu aimes toujours grimper aux arbres", answer: null });
    
    this.questions.push({ id: 100, house: 'Poufsouffle', text: "Tu aimes les hoodies trop grands", answer: null });
    this.questions.push({ id: 101, house: 'Poufsouffle', text: "Les animaux sont tes amis", answer: null });
    this.questions.push({ id: 102, house: 'Poufsouffle', text: "Tu aimes tout le monde ou presque", answer: null });
    this.questions.push({ id: 103, house: 'Poufsouffle', text: "Tu fredonnes des chansons quand tu te prépares", answer: null });
    this.questions.push({ id: 104, house: 'Poufsouffle', text: "Tu salues toujours tout le monde", answer: null });
    this.questions.push({ id: 105, house: 'Poufsouffle', text: "Tu fais les meilleurs calins", answer: null });
    this.questions.push({ id: 106, house: 'Poufsouffle', text: "Tu es très chatouilleux(se)", answer: null });
    this.questions.push({ id: 107, house: 'Poufsouffle', text: "Tu aimes collectionner des trucs", answer: null });
    this.questions.push({ id: 108, house: 'Poufsouffle', text: "Tu sais bien cuisiner", answer: null });
    this.questions.push({ id: 109, house: 'Poufsouffle', text: "Tu aimes écouter de vieux tubes", answer: null });
    this.questions.push({ id: 110, house: 'Poufsouffle', text: "Tu partages ta nourriture sans hésiter", answer: null });
    this.questions.push({ id: 111, house: 'Poufsouffle', text: "Tu sais toujours quoi dire", answer: null });
    this.questions.push({ id: 112, house: 'Poufsouffle', text: "Ta saison préférée est l'automne", answer: null });
    this.questions.push({ id: 113, house: 'Poufsouffle', text: "Tu ris de tout", answer: null });
    this.questions.push({ id: 114, house: 'Poufsouffle', text: "Tu aimes jouer à Super Mario", answer: null });
    this.questions.push({ id: 115, house: 'Poufsouffle', text: "Tu es patient(e)", answer: null });
    this.questions.push({ id: 116, house: 'Poufsouffle', text: "Tu aimes les sucreries", answer: null });
    this.questions.push({ id: 117, house: 'Poufsouffle', text: "Tu tombes facilement amoureux(se)", answer: null });
    this.questions.push({ id: 118, house: 'Poufsouffle', text: "Tu es du genre à porter/tu préfères le maquillage ultra discret", answer: null });
    this.questions.push({ id: 119, house: 'Poufsouffle', text: "Tu aimes la photo", answer: null });
    this.questions.push({ id: 120, house: 'Poufsouffle', text: "Tu trouves que les feuilles d'automne c'est trop beau", answer: null });
    this.questions.push({ id: 121, house: 'Poufsouffle', text: "Tu es un(e) romantique sans espoir", answer: null });
    this.questions.push({ id: 122, house: 'Poufsouffle', text: "Tu aimes les couvertures et vêtements tricotés", answer: null });
    this.questions.push({ id: 123, house: 'Poufsouffle', text: "Ta couleur préférée c'est le jaune", answer: null });
    this.questions.push({ id: 124, house: 'Poufsouffle', text: "Tu peux passer la journée à enchainer des séries TV", answer: null });

    this.questions.push({ id: 200, house: 'Serdaigle', text: "Tu aimes apprendre de nouvelles langues", answer: null });
    this.questions.push({ id: 201, house: 'Serdaigle', text: "Tu fais attention aux détails", answer: null });
    this.questions.push({ id: 202, house: 'Serdaigle', text: "Tu aimes relire des livres", answer: null });
    this.questions.push({ id: 203, house: 'Serdaigle', text: "Ton écriture est propre et jolie", answer: null });
    this.questions.push({ id: 204, house: 'Serdaigle', text: "Ta saison préférée c'est l'hiver", answer: null });
    this.questions.push({ id: 205, house: 'Serdaigle', text: "Tu aimes l'odeur des nouveaux livres", answer: null });
    this.questions.push({ id: 206, house: 'Serdaigle', text: "Tu préfères/porte pas ou peu de maquillage", answer: null });
    this.questions.push({ id: 207, house: 'Serdaigle', text: "Tu aimes bien les cheveux attachés en queue de cheval", answer: null });
    this.questions.push({ id: 208, house: 'Serdaigle', text: "Tu maitrises l'art de marcher en lisant", answer: null });
    this.questions.push({ id: 209, house: 'Serdaigle', text: "Tu corriges la grammaire des autres", answer: null });
    this.questions.push({ id: 210, house: 'Serdaigle', text: "Tu chantes sous la douche", answer: null });
    this.questions.push({ id: 211, house: 'Serdaigle', text: "Tu joues d'un instrument", answer: null });
    this.questions.push({ id: 212, house: 'Serdaigle', text: "Tu as une playlist pour étudier/travailler", answer: null });
    this.questions.push({ id: 213, house: 'Serdaigle', text: "Tu restes debout tard", answer: null });
    this.questions.push({ id: 214, house: 'Serdaigle', text: "Tu pourrais passer la journée à la bibliothèque", answer: null });
    this.questions.push({ id: 215, house: 'Serdaigle', text: "Tu es toujours à l'heure", answer: null });
    this.questions.push({ id: 216, house: 'Serdaigle', text: "Tu aimes les manteaux à la mode", answer: null });
    this.questions.push({ id: 217, house: 'Serdaigle', text: "Tu aimes découvrir de mignons petits coffee shops", answer: null });
    this.questions.push({ id: 218, house: 'Serdaigle', text: "Tu aimes les jeux de mots", answer: null });
    this.questions.push({ id: 219, house: 'Serdaigle', text: "Tu réfléchis souvent trop sur plein de sujets", answer: null });
    this.questions.push({ id: 220, house: 'Serdaigle', text: "Tu trouves que l'espace, c'est beau", answer: null });
    this.questions.push({ id: 221, house: 'Serdaigle', text: "Tu aimes les mythes et les légendes", answer: null });
    this.questions.push({ id: 222, house: 'Serdaigle', text: "Tu aimes l'architecture de la renaissance", answer: null });
    this.questions.push({ id: 223, house: 'Serdaigle', text: "Ta couleur préférée c'est le bleu", answer: null });
    this.questions.push({ id: 224, house: 'Serdaigle', text: "Les livres sont toujours meilleurs que les films", answer: null });

    this.questions.push({ id: 300, house: 'Serpentard', text: "Tu aimes le rouge à lèvres", answer: null });
    this.questions.push({ id: 301, house: 'Serpentard', text: "Les sarcasmes c'est ton truc", answer: null });
    this.questions.push({ id: 302, house: 'Serpentard', text: "Tu as peu d'amis, mais ce sont des amis très proches", answer: null });
    this.questions.push({ id: 303, house: 'Serpentard', text: "Tu aimes les films d'horreur", answer: null });
    this.questions.push({ id: 304, house: 'Serpentard', text: "La famille c'est très important", answer: null });
    this.questions.push({ id: 305, house: 'Serpentard', text: "Ta saison préférée est le printemps", answer: null });
    this.questions.push({ id: 306, house: 'Serpentard', text: "Tu aimes les vestes en cuir", answer: null });
    this.questions.push({ id: 307, house: 'Serpentard', text: "Tu sirotes souvent du thé", answer: null });
    this.questions.push({ id: 308, house: 'Serpentard', text: "Tu ne fais pas ce à quoi les autres s'attendent de ta part", answer: null });
    this.questions.push({ id: 309, house: 'Serpentard', text: "Tu aimes les traditions", answer: null });
    this.questions.push({ id: 310, house: 'Serpentard', text: "Qualité > Quantité", answer: null });
    this.questions.push({ id: 311, house: 'Serpentard', text: "Tu aimes les cols roulés", answer: null });
    this.questions.push({ id: 312, house: 'Serpentard', text: "Tu n'oublies jamais rien", answer: null });
    this.questions.push({ id: 313, house: 'Serpentard', text: "Tu aimes retirer un avantage de tes actes", answer: null });
    this.questions.push({ id: 314, house: 'Serpentard', text: "Samedi > Vendredi", answer: null });
    this.questions.push({ id: 315, house: 'Serpentard', text: "Tu adores les marques de luxe", answer: null });
    this.questions.push({ id: 316, house: 'Serpentard', text: "Tu es parfois amoureux de 10 personnes à la fois", answer: null });
    this.questions.push({ id: 317, house: 'Serpentard', text: "Un mensonge pour protéger l'autre c'est ok", answer: null });
    this.questions.push({ id: 318, house: 'Serpentard', text: "Tu aimes voyager par avion", answer: null });
    this.questions.push({ id: 319, house: 'Serpentard', text: "Tu suis les informations à la TV", answer: null });
    this.questions.push({ id: 320, house: 'Serpentard', text: "Tu trouves que les gemmes/pierres précieuses c'est beau", answer: null });
    this.questions.push({ id: 321, house: 'Serpentard', text: "Tu aimes la nourriture épicée", answer: null });
    this.questions.push({ id: 322, house: 'Serpentard', text: "Tu ne laisses jamais transparaitre tes émotions", answer: null });
    this.questions.push({ id: 323, house: 'Serpentard', text: "Ta couleur préférée c'est le vert", answer: null });
    this.questions.push({ id: 324, house: 'Serpentard', text: "Tu as beaucoup de secrets", answer: null });
  }
}
