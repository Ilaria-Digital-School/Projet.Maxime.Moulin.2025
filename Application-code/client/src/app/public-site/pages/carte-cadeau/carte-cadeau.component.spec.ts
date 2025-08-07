import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCadeauComponent } from './carte-cadeau.component';

describe('CarteCardeauComponent', () => {
  let component: CarteCadeauComponent;
  let fixture: ComponentFixture<CarteCadeauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteCadeauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteCadeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
