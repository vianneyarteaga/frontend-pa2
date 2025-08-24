import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LleguePage } from './llegue.page';

describe('LleguePage', () => {
  let component: LleguePage;
  let fixture: ComponentFixture<LleguePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LleguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
