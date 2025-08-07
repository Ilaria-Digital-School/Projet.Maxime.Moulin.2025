import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSiteComponent } from './public-site.component';

describe('PublicSiteComponent', () => {
  let component: PublicSiteComponent;
  let fixture: ComponentFixture<PublicSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
