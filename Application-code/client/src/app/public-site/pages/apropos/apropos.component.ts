import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocModalComponent } from "../../components/doc-modal/doc-modal.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-apropos',
  imports: [NgFor, DocModalComponent, RouterLink],
  templateUrl: './apropos.component.html',
  styleUrl: './apropos.component.css'
})
export class AproposComponent {
  images = [
    { src: '/images/pageAPropos/a-propos-massage-1.webp', alt: 'Massage 1' },
    { src: '/images/pageAPropos/a-propos-massage-2.webp', alt: 'Massage 2' },
    { src: '/images/pageAPropos/a-propos-massage-3.webp', alt: 'Massage 3' },
    { src: '/images/pageAPropos/a-propos-massage-4.webp', alt: 'Massage 4' },
    { src: '/images/pageAPropos/a-propos-massage-5.webp', alt: 'Massage 5' },
    { src: '/images/pageAPropos/a-propos-massage-6.webp', alt: 'Massage 6' }
  ];

  // Mise à jour dynamique de l'âge de la cliente sur la page "À propos"
  private birthDate = new Date('1999-09-14');

  get currentAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();
    const dayDiff = today.getDate() - this.birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
}
