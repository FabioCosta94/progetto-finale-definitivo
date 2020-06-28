import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByCountryComponent } from './filter-by-country.component';

describe('FilterByCountryComponent', () => {
  let component: FilterByCountryComponent;
  let fixture: ComponentFixture<FilterByCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
