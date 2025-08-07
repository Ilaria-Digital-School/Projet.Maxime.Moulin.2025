import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-modal',
  imports: [],
  templateUrl: './doc-modal.component.html',
  styleUrl: './doc-modal.component.css'
})
export class DocModalComponent implements OnInit {
    // Initialisation des variables
    slidedocumentIndex = 1;
  
    // Initialisation des fonctions
    ngOnInit(): void {
      this.showSlidesDocument(this.slidedocumentIndex);
    }

  // Fonctionnalité de slide pour les images de la brochure
  plusSlidesDocument(n: number): void {
    this.showSlidesDocument(this.slidedocumentIndex += n);
  }

  showSlidesDocument(n: number): void {
    const slides = Array.from(document.getElementsByClassName('document-slide')) as HTMLElement[];
    const prev = document.getElementById('prev-broch') as HTMLElement;
    const next = document.getElementById('next-broch') as HTMLElement;

    this.slidedocumentIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;

    slides.forEach((slide, index) => {
      slide.style.display = (index === this.slidedocumentIndex - 1) ? 'block' : 'none';
    });

    prev.style.visibility = (this.slidedocumentIndex === 1) ? 'hidden' : 'visible';
    next.style.visibility = (this.slidedocumentIndex === slides.length) ? 'hidden' : 'visible';
  }

  // Affichage des images en plein écran
  displayBrochure(): void {
    const modal = document.getElementById('documentModal');
    const documentSlideshow = document.getElementById('documentSlideshow');
    const documentModalCarte = document.getElementById('documentModalCarte');
    const span = document.getElementsByClassName('close')[0] as HTMLElement;

    if (modal && documentSlideshow && documentModalCarte) {
      modal.style.display = 'flex';
      documentModalCarte.style.display = 'none';
      documentSlideshow.style.display = 'flex';

      span.addEventListener('click', () => {
        modal.style.display = 'none';
        documentSlideshow.style.display = 'none';
      });
    }
  }

  displayCarte(): void {
    const modal = document.getElementById('documentModal');
    const documentSlideshow = document.getElementById('documentSlideshow');
    const documentModalCarte = document.getElementById('documentModalCarte');
    const span = document.getElementsByClassName('close')[0] as HTMLElement;

    if (modal && documentSlideshow && documentModalCarte) {
      modal.style.display = 'flex';
      documentSlideshow.style.display = 'none';
      documentModalCarte.style.display = 'flex';

      span.addEventListener('click', () => {
        modal.style.display = 'none';
        documentModalCarte.style.display = 'none';
      });
    }
  }
}
