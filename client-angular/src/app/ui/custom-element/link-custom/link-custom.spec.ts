import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCustom } from './link-custom';

describe('LinkCustom', () => {
  let component: LinkCustom;
  let fixture: ComponentFixture<LinkCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkCustom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
