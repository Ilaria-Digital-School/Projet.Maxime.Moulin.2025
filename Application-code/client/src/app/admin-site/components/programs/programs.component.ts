import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content/content.service';

// Définition des interfaces pour les entrées de massage et les programmes groupés
export interface MassageEntry {
  programID: number; 
  massageID: number;
  altMassage: string;
  massageOrder: number;
  quantity: number;
  programName: string;
  massageName: string;
  newPrice: number;
}

export interface GroupedProgram {
  programID: number;
  programName: string;
  newPrice: number;
  massages: {
    massageID: number;
    massageName: string;
    altMassage: string;
    massageOrder: number;
    quantity: number;
  }[];
}

@Component({
  selector: 'app-programs',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})

export class ProgramsComponent implements OnInit {
  contentType = 'programs';
  programmes: any = [];
  groupedPrograms: any = [];
  selectedProgramId: number | null = null;
  showModal: boolean = false;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContent(this.contentType).subscribe((data: MassageEntry[]) => {
      this.groupedPrograms = [];

      // Utilisation d'une Map pour regrouper les massages et soins par programID
      const groupMap = new Map<number, GroupedProgram>();

      for (const entry of data) {
        if (!groupMap.has(entry.programID)) {
          groupMap.set(entry.programID, {
            programID: entry.programID,
            programName: entry.programName,
            newPrice: entry.newPrice,
            massages: []
          });
        }

        const group = groupMap.get(entry.programID);
        if (group) {
          group.massages.push({
            massageID: entry.massageID,
            massageName: entry.massageName,
            altMassage: entry.altMassage,
            massageOrder: entry.massageOrder,
            quantity: entry.quantity
          });
        }        
      }

      this.groupedPrograms = Array.from(groupMap.values());
    });
  }

  openConfirmModal(id: number): void {
  this.selectedProgramId = id;
  this.showModal = true;
  }

  onConfirmDelete(): void {
    if (!this.selectedProgramId) return;

    this.contentService.deleteContent(this.contentType, this.selectedProgramId).subscribe({
      next: () => {
        console.log('Review disabled successfully');
        this.ngOnInit();
        this.showModal = false;
        this.selectedProgramId = null;
    }
      , error: (error) => {
        console.error('Error disabling review:', error);
        this.showModal = false;
    }
    });
  }

  onCancelDelete(): void {
    this.showModal = false;
    this.selectedProgramId = null;
  }
}
