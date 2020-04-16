import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeerajComponent } from './neeraj.component';

describe('NeerajComponent', () => {
  let component: NeerajComponent;
  let fixture: ComponentFixture<NeerajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeerajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeerajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
