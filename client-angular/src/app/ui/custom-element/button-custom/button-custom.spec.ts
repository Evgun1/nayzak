import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCustom } from './button-custom';

describe('ButtonCustom', () => {
  let component: ButtonCustom;
  let fixture: ComponentFixture<ButtonCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCustom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
