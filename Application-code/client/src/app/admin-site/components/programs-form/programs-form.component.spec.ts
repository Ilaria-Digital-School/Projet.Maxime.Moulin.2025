import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsFormComponent } from './programs-form.component';

describe('ProgramsFormComponent', () => {
  let component: ProgramsFormComponent;
  let fixture: ComponentFixture<ProgramsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
