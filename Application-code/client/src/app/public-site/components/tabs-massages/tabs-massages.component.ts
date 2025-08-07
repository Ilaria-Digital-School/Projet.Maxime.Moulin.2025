import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PublicContentService } from '../../services/public-content/public-content.service';

@Component({
  selector: 'app-tabs-massages',
  imports: [NgFor, NgIf],
  templateUrl: './tabs-massages.component.html',
  styleUrl: './tabs-massages.component.css'
})
export class TabsMassagesComponent implements OnInit {
  contentType: string = 'massages';
  tabs: any = [];
  activeTabIndex: number = 0;
  afficherPlusBool: boolean = false;

  constructor(private massagesService: PublicContentService) {}

  ngOnInit(): void {
    this.massagesService.getContent(this.contentType).subscribe((data) => {
      this.tabs = data.filter((massage: any) => massage.category === 'massage');
    });
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
    this.afficherPlusBool = false;

    const imageContainer = document.querySelector('.tabs-image') as HTMLElement;
    const contentContainer = document.querySelector('.tabs-content') as HTMLElement;

  if (contentContainer && imageContainer) {
    contentContainer.classList.add('fade-out');
    imageContainer.classList.add('fade-out');

    // Attendez la fin de l'animation avant de changer l'onglet
    setTimeout(() => {
      this.activeTabIndex = index;
      contentContainer.classList.remove('fade-out');
      imageContainer.classList.remove('fade-out');
      contentContainer.classList.add('fade-in');
      imageContainer.classList.add('fade-in');

      // Supprimez la classe fade-in après l'animation
      setTimeout(() => {
        contentContainer.classList.remove('fade-in');
        imageContainer.classList.remove('fade-in');
      }, 500);
    }, 500);
  }
  }

  afficher(): void {
    this.afficherPlusBool = !this.afficherPlusBool;
  }

  getAfficherButtonText(): string {
    return this.afficherPlusBool ? 'Afficher moins ...' : 'Afficher plus ...';
  }
}
