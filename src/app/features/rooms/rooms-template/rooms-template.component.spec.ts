import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsTemplateComponent } from './rooms-template.component';

describe('RoomsTemplateComponent', () => {
  let component: RoomsTemplateComponent;
  let fixture: ComponentFixture<RoomsTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsTemplateComponent]
    });
    fixture = TestBed.createComponent(RoomsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
