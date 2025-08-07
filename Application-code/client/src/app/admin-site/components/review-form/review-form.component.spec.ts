import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ReviewFormComponent } from './review-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReviewFormComponent', () => {
  let component: ReviewFormComponent;
  let fixture: ComponentFixture<ReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewFormComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [  
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null  // ou retourne un ID simulé
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test pour vérifier que le formulaire est invalide lorsque les champs requis sont vides
  fit('devrait rendre le formulaire invalide si les champs sont vides', () => {
    component.reviewForm.patchValue({
      reviewText: '',
      reviewAuthor: '',
      massageID: ''
    });

    console.log('Formulaire valide ?', component.reviewForm.valid);
    expect(component.reviewForm.valid).toBeFalse();
  });
});
