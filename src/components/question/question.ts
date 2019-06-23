import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Choice, Question} from "../../pages/quizz/quizz";

@Component({
  selector: 'ht-question',
  templateUrl: 'question.html'
})
export class QuestionComponent implements OnInit {

  @Input()
  public question: Question;

  @Output()
  public answered: EventEmitter<Choice> = new EventEmitter();

  constructor() {
  }
  ngOnInit(): void {
  }

  public answer(choice: Choice): void {
    this.answered.emit(choice);
  }
}
