import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSoinsComponent } from './tabs-soins.component';

describe('TabsSoinsComponent', () => {
  let component: TabsSoinsComponent;
  let fixture: ComponentFixture<TabsSoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsSoinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsSoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
