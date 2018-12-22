import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizzResultDetailsPage } from './quizz-result-details';

@NgModule({
  declarations: [
    QuizzResultDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizzResultDetailsPage),
  ],
})
export class QuizzResultDetailsPageModule {}
