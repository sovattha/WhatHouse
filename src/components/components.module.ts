import { NgModule } from '@angular/core';
import { QuestionComponent } from './question/question';
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [QuestionComponent],
	imports: [
	  CommonModule
  ],
	exports: [QuestionComponent]
})
export class ComponentsModule {}
