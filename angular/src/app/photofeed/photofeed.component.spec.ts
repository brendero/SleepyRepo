import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotofeedComponent } from './photofeed.component';

describe('PhotofeedComponent', () => {
  let component: PhotofeedComponent;
  let fixture: ComponentFixture<PhotofeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotofeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotofeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
