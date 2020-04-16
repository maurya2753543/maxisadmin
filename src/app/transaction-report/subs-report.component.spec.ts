import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsReportComponent } from './subs-report.component';

describe('SubsReportComponent', () => {
  let component: SubsReportComponent;
  let fixture: ComponentFixture<SubsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
