import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClocksComponent } from './clocks.component';

describe('ClocksComponent', () => {
  let component: ClocksComponent;
  let fixture: ComponentFixture<ClocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
