import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedLocationComponent } from './searched-location.component';

describe('SearchedLocationComponent', () => {
  let component: SearchedLocationComponent;
  let fixture: ComponentFixture<SearchedLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
