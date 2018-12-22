import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * Generated class for the QuestionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ht-question',
  templateUrl: 'question.html'
})
export class QuestionComponent implements OnInit {

  @Input()
  public text: string = '';

  @Output()
  public answered: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }
  ngOnInit(): void {
  }

  public answer(yesOrNo: boolean): void {
    this.answered.emit(yesOrNo);
  }
}
