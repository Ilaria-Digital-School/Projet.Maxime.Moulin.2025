import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { ContentService } from '../../services/content/content.service';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit {
  contentType: string = 'reviews';
  reviewForm!: FormGroup;
  reviewID: number | null = null;
  mode: 'add' | 'edit' = 'add';
  message: string = '';
  loading = false;
  massages: any = [];
  textRegex = /^[a-zA-ZÀ-ÿ0-9œ&\s.,;:!?'’"()-/\r\n\t]+$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
   ) {}

  ngOnInit(): void {
    this.reviewID = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.reviewID ? 'edit' : 'add';

    this.reviewForm = new FormGroup({
      massageID: new FormControl(
        '',
        Validators.required,
      ),
      reviewText: new FormControl(
        '',
        { validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
        Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      ),
      reviewAuthor: new FormControl(
        '',
        { validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      )
   });

   if (this.mode === 'edit') {
    this.loadReview(this.reviewID);
   }

    /* Chargement des massages pour le "select" */
    this.contentService.getContent('massages').subscribe((data) => {
    this.massages = data;
    });

  }

  loadReview(id: number): void {
    this.loading = true;
    this.contentService.getContentById(this.contentType, id).subscribe({
      next: (data) => {
        this.reviewForm.patchValue(data);
        this.loading = false;
      },
      error: () => {
        this.message = 'Erreur lors du chargement de l\'avis.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.reviewForm.invalid){
      this.message = 'Formulaire invalide.';
      return;
    }

    const reviewData = this.reviewForm.value;

    if (this.mode === 'edit') {
      this.contentService.updateContent(this.contentType, this.reviewID!, reviewData).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard/avis']);
        },
        error: () => {
          this.message = 'Erreur lors de la mise à jour de l\'avis.';
        }
      });
    } else {
      this.contentService.addContent(this.contentType, reviewData).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard/avis']);
        },
        error: () => {
          this.message = 'Erreur lors de l\'ajout de l\'avis.';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/avis']);
  }

}