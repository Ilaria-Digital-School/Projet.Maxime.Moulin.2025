import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content/content.service';

@Component({
  selector: 'app-reviews',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  contentType: string = 'reviews';
  reviews: any = [];
  selectedReviewId: number | null = null;
  showModal: boolean = false;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getContent(this.contentType).subscribe((data) => {
      this.reviews = data;
    });
  }

  openConfirmModal(id: number): void {
    this.selectedReviewId = id;
    this.showModal = true;
  }

  onConfirmDelete(): void {
    if (!this.selectedReviewId) return;

    this.contentService.deleteContent(this.contentType, this.selectedReviewId).subscribe({
      next: () => {
        console.log('Review disabled successfully');
        this.ngOnInit();
        this.showModal = false;
        this.selectedReviewId = null;
    }
      , error: (error) => {
        console.error('Error disabling review:', error);
        this.showModal = false;
    }
    });
  }

  onCancelDelete(): void {
    this.showModal = false;
    this.selectedReviewId = null;
  }
}