import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ContactBannerComponent } from "../../components/contact-banner/contact-banner.component";
import { NgIf } from '@angular/common';
import { PublicContentService } from '../../services/public-content/public-content.service';
import { RecaptchaService } from '../../services/recaptcha/recaptcha.service';
import { CookieConsentService } from '../../services/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-contact',
  imports: [ContactBannerComponent, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
  contentType: string = 'contact';
  messageEnvoye: boolean = false;
  messageErreur: boolean = false;
  cookieConsentGiven = false;
  showCookieError = false;

  constructor(
    private contactService: PublicContentService,
    private recaptchaService: RecaptchaService,
    private cookieConsent: CookieConsentService
  ) {}

  contactForm = new FormGroup({

    subject : new FormControl(
      "",
      {validators: [
        Validators.required,
      ],
      updateOn: 'blur'
      }
    ),

    lastname: new FormControl(
      "",
      {validators: [
        Validators.required,      
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-ZÀ-ÿ '-]+$"),
      ],
      updateOn: 'blur'
      }
    ),

    firstname: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("^[a-zA-ZÀ-ÿ '-]+$"),
      ],
    updateOn: 'blur'
      }
    ),

    email: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.email,
      ],
    updateOn: 'blur'
      }
    ),

    phone: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.pattern("^[0-9]{10}$|^[ 0-9]{14}$"),
      ],
    updateOn: 'blur'
      }
    ),

    message: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.minLength(30),
      Validators.maxLength(500),
      Validators.pattern("^[a-zA-ZÀ-ÿ0-9 \'\-\.\,\!\?\"\(\)\n\r\s]+$"),
      ],
    updateOn: 'blur'
      }
    ),

  });
  
  private afficherPopup(type: 'success' | 'error') {
    if (type === 'success') {
      this.messageEnvoye = true;
      this.messageErreur = false;
    } else {
      this.messageEnvoye = false;
      this.messageErreur = true;
    }
  
    setTimeout(() => {
      this.messageEnvoye = false;
      this.messageErreur = false;
    }, 5000);
  }

  ngOnInit(): void {
    this.cookieConsent.consent$.subscribe(consent => {
      this.cookieConsentGiven = consent;
      if (consent) {
        this.showCookieError = false; // Cache le message si l'utilisateur accepte
      }
    });
  }

  async onSubmit() {
      if (!this.cookieConsentGiven) {
      this.showCookieError = true;
      return;
      }

      if (this.contactForm.valid) {
          const token = await this.recaptchaService.getToken('contact_form');

            const formData = {

              ...this.contactForm.value,
              captcha: token
            };

          this.contactService.postContent(this.contentType, formData).subscribe(
            () => {
              this.afficherPopup('success');
              this.contactForm.reset();
            },

            (error) => {
              console.error('Erreur lors de l\'envoi du message', error);
              this.afficherPopup('error');
            }
          );

      } else {
        
        this.contactForm.markAllAsTouched();
      }
  }
}