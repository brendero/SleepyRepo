import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotofeedAddComponent } from './photofeed-add.component';

describe('PhotofeedAddComponent', () => {
  let component: PhotofeedAddComponent;
  let fixture: ComponentFixture<PhotofeedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotofeedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotofeedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
