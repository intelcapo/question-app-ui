import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsUsersComponent } from './questions-users.component';

describe('QuestionsUsersComponent', () => {
  let component: QuestionsUsersComponent;
  let fixture: ComponentFixture<QuestionsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsUsersComponent]
    });
    fixture = TestBed.createComponent(QuestionsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
