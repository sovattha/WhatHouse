import { ComponentsModule } from './../../components/components.module';
import { QuizzPage } from './quizz';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    QuizzPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizzPage),
    ComponentsModule
  ],
})
export class QuizzPageModule {}
