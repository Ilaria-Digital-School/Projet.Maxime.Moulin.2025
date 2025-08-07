import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

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
  massagesTable: {
    massageID: any; // Peut être un nombre ou 'perso' pour les massages personnalisés
    massageName: string;
    altMassage: string;
    massageOrder: number;
    quantity: number;
  }[];
}

@Component({
  selector: 'app-programs-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './programs-form.component.html',
  styleUrl: './programs-form.component.css'
})
export class ProgramsFormComponent implements OnInit {
  contentType: string = 'programs'; // Type de contenu géré par ce composant
  programForm!: FormGroup; // Formulaire de création/édition de programme
  programID: number | null = null; // ID du programme, null si ajout
  mode: 'add' | 'edit' = 'add'; // Mode d'affichage du formulaire (ajout ou édition)
  message: string = ''; // Message de retour pour l'utilisateur
  massagesNameList: any = []; // Liste des massages pour le "select"
  groupedProgram: any = []; // Programmes groupés pour l'affichage
  textPattern = /^[a-zA-ZÀ-ÿ0-9\s.,;:!?'"()-/]+$/; // Pattern pour les massages alternatifs

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.programID = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.programID ? 'edit' : 'add';

    this.programForm = new FormGroup({
      programName: new FormControl(
        '',
        { validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(this.textPattern)
        ],
        updateOn: 'blur'
        }
      ),
      priceActive: new FormControl(false),
      newPrice : new FormControl(
        '',
        { validators: [
          Validators.min(1),
          Validators.max(2000)
        ],
        updateOn: 'blur'
        }
      ),
      massages: new FormArray([])
    });

     // Ajout d'un massage par défaut pour un nouveau programme
    if (this.mode === 'add') {
      this.addMassage();
    }

    if (this.mode === 'edit') {
      this.loadProgram(this.programID);
    }

    /* Chargement des massages pour le "select" */
    this.contentService.getContent('massages').subscribe((data) => {
    this.massagesNameList = data;
    });
  }

  // Get pour accéder facilement au tableau de massages dans le formulaire
  get massages(): FormArray {
    return this.programForm.get('massages') as FormArray;
  }

  addMassage(): void {
    this.massages.push(new FormGroup({
      massageID: new FormControl(
        'init',
        { validators: [
          Validators.required,
          // Validator personnalisé pour s'assurer que ce n'est pas "init"
          (control) => control.value !== 'init' ? null : { invalidMassage: true }
        ],
        updateOn: 'blur'
        }
      ),

      altMassage: new FormControl(
        '',
        { validators: [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(this.textPattern)
        ],
        updateOn: 'blur'
        }
      ),

      quantity: new FormControl(
        1,
        { validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/^\d+$/) // Accepter uniquement des nombres entiers
        ],
        updateOn: 'blur'
        }
      ),
    }));
  }

  removeMassage(index: number): void {
    this.massages.removeAt(index);
  }

  loadProgram(id: number): void {
    this.contentService.getContentById(this.contentType, id).subscribe((data: MassageEntry[]) => {
      this.groupedProgram = [];
    
      // Utilisation d'une Map pour regrouper les massages et soins par programID
      const groupMap = new Map<number, GroupedProgram>();
    
      for (const entry of data) {    
        if (!groupMap.has(entry.programID)) {
          groupMap.set(entry.programID, {
            programID: entry.programID,
            programName: entry.programName,
            newPrice: entry.newPrice, // Optionnel, pour les programmes avec prix
            massagesTable: []
          });
        }
        const group = groupMap.get(entry.programID);
        if (group) {
            group.massagesTable.push({
            massageID: entry.massageID !== null ? entry.massageID : 'perso',
            massageName: entry.massageName,
            altMassage: entry.altMassage,
            massageOrder: entry.massageOrder,
            quantity: entry.quantity
            });
        }
      }
    
      this.groupedProgram = Array.from(groupMap.values());

      // Patching du nom du programme dans le formulaire
      this.programForm.patchValue({
        programName: this.groupedProgram[0].programName,
        });

      // Patching du prix du programme si disponible
      if (this.groupedProgram[0].newPrice) {
        this.programForm.patchValue({
          priceActive: true
        });
        this.programForm.patchValue({
          newPrice: this.groupedProgram[0].newPrice
        });
      } else {
        this.programForm.patchValue({
          newPrice: null
        }
        );
      }

      // Réinitialisation du tableau de massages
      this.massages.clear();

      // Ajout des massages existants au formulaire
      for (const massageEntry of this.groupedProgram[0].massagesTable) {
        this.massages.push(new FormGroup({
          massageID: new FormControl(massageEntry.massageID || '', Validators.required),
          altMassage: new FormControl(massageEntry.altMassage || '', [
            Validators.minLength(3),
            Validators.maxLength(100),
            Validators.pattern(this.textPattern)
          ]),
          quantity: new FormControl(massageEntry.quantity, [
            Validators.required,
            Validators.min(1)
          ]),
        }));
      };
    }, (error) => {
      console.error('Erreur lors du chargement du programme:', error);
      this.message = 'Erreur lors du chargement du programme.';
    }
    );
  }

  onSubmit(): void {
    // Si le prix personnalisé est désactivé, on supprime le champ newPrice
    if (!this.programForm.value.priceActive) {
      this.programForm.patchValue({
        newPrice: null
      });
    }

    // Si le prix personnalisé est activé mais que le champ newPrice est vide, on désactive le champ
    if (this.programForm.value.priceActive && !this.programForm.value.newPrice) {
      this.programForm.patchValue({
        priceActive: false
      });
    }

    // Récupération des données du formulaire
    const programData = this.programForm.value;

        if (this.programForm.invalid){
      this.message = 'Formulaire invalide.';
      console.error('Formulaire invalide:', this.programForm.errors);
      console.error('Détails du formulaire:', this.programForm.value);
      return;
    }

    // Envoi des données au service
    if (this.mode === 'edit') {
      this.contentService.updateContent(this.contentType, this.programID!, programData).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard/programmes']);
        },
        error: () => {
          this.message = 'Erreur lors de la mise à jour du programme.';
        }
      });
    } else { 
      this.contentService.addContent(this.contentType, programData).subscribe({
        next: () => {
          this.message = 'Programme ajouté avec succès.';
          this.router.navigate(['/admin/dashboard/programmes']);
        },
        error: () => {
          this.message = 'Erreur lors de l\'ajout du programme.';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/programmes']);
  }

}
