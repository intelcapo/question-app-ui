import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsFormComponent } from './rooms-form.component';

describe('RoomsFormComponent', () => {
  let component: RoomsFormComponent;
  let fixture: ComponentFixture<RoomsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsFormComponent]
    });
    fixture = TestBed.createComponent(RoomsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
