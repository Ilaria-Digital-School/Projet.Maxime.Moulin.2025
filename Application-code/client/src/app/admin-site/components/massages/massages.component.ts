import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content/content.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-massages',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './massages.component.html',
  styleUrl: './massages.component.css'
})
export class MassagesComponent implements OnInit {
  contentType: string = 'massages';
  massages: any = [];
  soins: any = [];
  selectedMassageId: number | null = null;
  showModal: boolean = false;
  environmentUrl: string = environment.imagesMainUrl;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getContent(this.contentType).subscribe((data) => {
      this.massages = data.filter((massage: any) => massage.category === 'massage');
      this.soins = data.filter((massage: any) => massage.category === 'soin');  
  });
  }

  displayDetails(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'flex';
    }

    const displayButton = document.getElementById('display-btn-' + id);
    if (displayButton) {
      displayButton.style.display = 'none';
    }

    const hideButton = document.getElementById('hide-btn-' + id);
    if (hideButton) {
      hideButton.style.display = 'block';
    }
  }

  hideDetails(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'none';
    }

        const hideButton = document.getElementById('hide-btn-' + id);
    if (hideButton) {
      hideButton.style.display = 'none';
    }

        const displayButton = document.getElementById('display-btn-' + id);
    if (displayButton) {
      displayButton.style.display = 'block';
    }
  }

  openConfirmModal(id: number): void {
    this.selectedMassageId = id;
    this.showModal = true;
  }

  onConfirmDelete(): void {
    if (!this.selectedMassageId) return;

    this.contentService.deleteContent(this.contentType, this.selectedMassageId).subscribe({
      next: () => {
        console.log('Review disabled successfully');
        this.ngOnInit();
        this.showModal = false;
        this.selectedMassageId = null;
    }
      , error: (error) => {
        console.error('Error disabling review:', error);
        this.showModal = false;
    }
    });
  }

  onCancelDelete(): void {
    this.showModal = false;
    this.selectedMassageId = null;
  }
}