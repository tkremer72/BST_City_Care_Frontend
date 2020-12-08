import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTallyComponent } from './site-tally.component';

describe('SiteTallyComponent', () => {
  let component: SiteTallyComponent;
  let fixture: ComponentFixture<SiteTallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
