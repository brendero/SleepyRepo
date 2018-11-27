import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDetailComponent } from './friends-detail.component';

describe('FriendsDetailComponent', () => {
  let component: FriendsDetailComponent;
  let fixture: ComponentFixture<FriendsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
