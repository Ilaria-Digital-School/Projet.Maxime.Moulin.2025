import { Component, OnInit } from '@angular/core';
import { PublicContentService } from '../../services/public-content/public-content.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-reviews',
  imports: [NgIf],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.css'
})
export class CustomerReviewsComponent implements OnInit {
  contentType: string = 'reviews';
  reviews: any = [];
  slideIndex: number = 0;

  constructor(private contentService: PublicContentService) {}

  ngOnInit(): void {
    this.contentService.getContent(this.contentType).subscribe((data) => {
      this.reviews = data;
    });
  }

  plusSlides(n: number): void {
    const total = this.reviews.length;
    this.slideIndex = (this.slideIndex + n + total) % total;
  }
}
