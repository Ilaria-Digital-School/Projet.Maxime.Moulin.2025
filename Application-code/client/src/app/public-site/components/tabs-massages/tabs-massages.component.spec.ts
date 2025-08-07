import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMassagesComponent } from './tabs-massages.component';

describe('TabsMassagesComponent', () => {
  let component: TabsMassagesComponent;
  let fixture: ComponentFixture<TabsMassagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsMassagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsMassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
