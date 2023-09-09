import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSuggestionsComponent } from './questions-suggestions.component';

describe('QuestionsSuggestionsComponent', () => {
  let component: QuestionsSuggestionsComponent;
  let fixture: ComponentFixture<QuestionsSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsSuggestionsComponent]
    });
    fixture = TestBed.createComponent(QuestionsSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
