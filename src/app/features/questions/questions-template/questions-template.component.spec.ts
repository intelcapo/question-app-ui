import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTemplateComponent } from './questions-template.component';

describe('QuestionsTemplateComponent', () => {
  let component: QuestionsTemplateComponent;
  let fixture: ComponentFixture<QuestionsTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsTemplateComponent]
    });
    fixture = TestBed.createComponent(QuestionsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
