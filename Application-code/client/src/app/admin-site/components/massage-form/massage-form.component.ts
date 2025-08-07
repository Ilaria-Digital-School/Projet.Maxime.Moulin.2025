import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ContentService } from '../../services/content/content.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-massage-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './massage-form.component.html',
  styleUrl: './massage-form.component.css'
})
export class MassageFormComponent implements OnInit {
  contentType: string = 'massages';
  massageForm!: FormGroup;
  massageID: number | null = null;
  mode: 'add' | 'edit' = 'add';
  message: string = '';
  loading = false;
  relativeUrl: string = '';
  displayedImageUrl: string = '';
  selectedFile: File | null = null;
  previewUrl: string = '';
  textRegex = /^[a-zA-ZÀ-ÿ0-9œ&\s.,;:!?'’"()-/\r\n\t]+$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
   ) {}

  ngOnInit(): void {
    this.massageID = Number(this.route.snapshot.paramMap.get('id'));
    this.mode = this.massageID ? 'edit' : 'add';

    this.massageForm = new FormGroup({
      category: new FormControl(
        '',
        { validators : [
        Validators.required
        ],
        updateOn: 'blur'
        }
      ),
      massageName: new FormControl(
        '',
        { validators : [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      ),
      tags: new FormControl(
        '',
        { validators : [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      ),
      target: new FormControl(
        '',
        { validators : [
          Validators.maxLength(30),
          Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      ),
      description: new FormControl(
        '',
        { validators : [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
          Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      ),
      content: new FormControl(
        '',
        { validators : [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(3000),
          Validators.pattern(this.textRegex)
        ],
        updateOn: 'blur'
        }
      ),
      imageUrl: new FormControl(
        ''
      )
    });

   if (this.mode === 'edit') {
    this.loadMassage(this.massageID);
   }
  }

  loadMassage(id: number): void {
    this.loading = true;
    this.contentService.getContentById(this.contentType, id).subscribe({
      next: (data) => {
        this.massageForm.patchValue(data);
        this.relativeUrl = data.imageUrl;
        this.displayedImageUrl = environment.imagesMainUrl + data.imageUrl;
        
        this.loading = false;
      },
      error: () => {
        this.message = 'Erreur lors du chargement de l\'avis.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    // Vérification de la validité du formulaire
    if (this.massageForm.invalid){
      this.message = 'Formulaire invalide.';
      return;
    }

    // Vérification de la présence d'une image pour le mode 'add'
    if (!this.selectedFile && this.mode === 'add') {
      this.message = 'Veuillez sélectionner une image.';
      return;
    }

    // Préparation des données du formulaire
    const massageData = new FormData();

    // Ajout de tous les champs du formulaire
    Object.entries(this.massageForm.value).forEach(([key, value]) => {
      massageData.append(key, value as string);
    });

    // Ajout de l'image si elle est sélectionnée 
    if (this.selectedFile) {
      const fileName = this.massageForm.value.massageName.replace(/\s+/g, '-').toLowerCase();
      const fileExt = this.selectedFile.name.split('.').pop();
      const newFile = new File([this.selectedFile], `${fileName}.${fileExt}`, { type: this.selectedFile.type });
      massageData.append('image', newFile, newFile.name);
    }

    // Envoi des données au service
    if (this.mode === 'edit') {
      this.contentService.updateContent(this.contentType, this.massageID!, massageData).subscribe({
        next: () => {
          this.message = 'Massage mis à jour avec succès.';
          this.router.navigate(['/admin/dashboard/massages']);
        },
      error: (err) => {
          this.message = 'Erreur lors de la mise à jour du massage.';
          console.error('Update error:', err);
      }
      });
    } else { 
      this.contentService.addContent(this.contentType, massageData).subscribe({
        next: () => {
          this.message = 'Massage ajouté avec succès.';
          this.router.navigate(['/admin/dashboard/massages']);
        },
        error: () => {
          this.message = 'Erreur lors de l\'ajout du massage.';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard/massages']);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Mise à jour du nom et de l'URL de l'image
      const fileName = this.massageForm.value.massageName.replace(/\s+/g, '-').toLowerCase();
      const fileExt = this.selectedFile.name.split('.').pop();
      const newFileUrl = environment.massageImageFolderUrl + fileName + '.' + fileExt;

      // Mise à jour du champ imageUrl du formulaire
      this.massageForm.patchValue({ imageUrl: newFileUrl });

      // Gestion de l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.previewUrl = '';
    }
  }

}