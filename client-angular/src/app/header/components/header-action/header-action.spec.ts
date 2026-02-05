import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAction } from './header-action';

describe('HeaderAction', () => {
  let component: HeaderAction;
  let fixture: ComponentFixture<HeaderAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
