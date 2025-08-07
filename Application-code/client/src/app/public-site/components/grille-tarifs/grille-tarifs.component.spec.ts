import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleTarifsComponent } from './grille-tarifs.component';

describe('GrilleTarifsComponent', () => {
  let component: GrilleTarifsComponent;
  let fixture: ComponentFixture<GrilleTarifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrilleTarifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrilleTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
