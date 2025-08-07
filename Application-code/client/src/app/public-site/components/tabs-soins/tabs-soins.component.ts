import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PublicContentService } from '../../services/public-content/public-content.service';

@Component({
  selector: 'app-tabs-soins',
  imports: [NgFor, NgIf],
  templateUrl: './tabs-soins.component.html',
  styleUrl: './tabs-soins.component.css'
})
export class TabsSoinsComponent implements OnInit {
  contentType: string = 'massages';
  tabs: any = [];
  activeTabIndex: number = 0;
  afficherPlusBool: boolean = false;

  constructor(private massagesService: PublicContentService) {}

  ngOnInit(): void {
    this.massagesService.getContent(this.contentType).subscribe((data) => {
      this.tabs = data.filter((treatment: any) => treatment.category === 'soin'); 
    });
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
    this.afficherPlusBool = false;

    const imageContainerSoins = document.querySelector('.tabs-soins-image') as HTMLElement;
    const contentContainerSoins = document.querySelector('.tabs-soins-content') as HTMLElement;

  if (contentContainerSoins && imageContainerSoins) {
    contentContainerSoins.classList.add('fade-out');
    imageContainerSoins.classList.add('fade-out');

    // Attendez la fin de l'animation avant de changer l'onglet
    setTimeout(() => {
      this.activeTabIndex = index;
      contentContainerSoins.classList.remove('fade-out');
      imageContainerSoins.classList.remove('fade-out');
      contentContainerSoins.classList.add('fade-in');
      imageContainerSoins.classList.add('fade-in');

      // Supprimez la classe fade-in après l'animation
      setTimeout(() => {
        contentContainerSoins.classList.remove('fade-in');
        imageContainerSoins.classList.remove('fade-in');
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