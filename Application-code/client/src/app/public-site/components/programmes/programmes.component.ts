import { Component, OnInit } from '@angular/core';
import { PublicContentService } from '../../services/public-content/public-content.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface MassageEntry {
  programID: number;
  massageID: number;
  altMassage: string;
  massageOrder: number;
  quantity: number;
  programName: string;
  massageName: string;
  newPrice: number | null;
}

export interface GroupedProgram {
  programID: number;
  programName: string;
  newPrice: number | null;
  massages: {
    massageID: number;
    massageName: string;
    altMassage: string;
    massageOrder: number;
    quantity: number;
  }[];
}

@Component({
  selector: 'app-programmes',
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './programmes.component.html',
  styleUrl: './programmes.component.css'
})

export class ProgrammesComponent implements OnInit {
  contentType: string = 'programs';
  programmes: any = [];
  groupedPrograms: any = [];

  constructor(private progService: PublicContentService) {}

  ngOnInit(): void {
    this.progService.getContent(this.contentType).subscribe((data: MassageEntry[]) => {
      this.groupedPrograms = [];

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
}
