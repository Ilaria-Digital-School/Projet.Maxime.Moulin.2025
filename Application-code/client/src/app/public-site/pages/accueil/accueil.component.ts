import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocModalComponent } from '../../components/doc-modal/doc-modal.component';
import { ContactBannerComponent } from '../../components/contact-banner/contact-banner.component';
import { CustomerReviewsComponent } from "../../components/customer-reviews/customer-reviews.component";

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, DocModalComponent, ContactBannerComponent, CustomerReviewsComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})

export class AccueilComponent {}


