import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { PublicContentService } from '../../services/public-content/public-content.service';
import { RecaptchaService } from '../../services/recaptcha/recaptcha.service';
import { CookieConsentService } from '../../services/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-carte-cadeau',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './carte-cadeau.component.html',
  styleUrl: './carte-cadeau.component.css'
})
export class CarteCadeauComponent {
  contentType: string = 'gift-card';
  requestSent: boolean = false;
  requestError: boolean = false; 
  cookieConsentGiven = false;
  showCookieError = false;

    constructor(
      private giftCardService: PublicContentService,
      private recaptchaService: RecaptchaService,
      private cookieConsent: CookieConsentService
    ) {}
  
  giftCardForm = new FormGroup({
    giftCardType : new FormControl(
      "",
      {validators: [
        Validators.required,
      ],
      updateOn: 'blur'
      }
    ),
    
    duration : new FormControl(
      "",
      {validators: [
        Validators.required,
      ],
      updateOn: 'blur'
      }
    ),

    toName : new FormControl(
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

    fromName : new FormControl(
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

    lastName: new FormControl(
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

    firstName: new FormControl(
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

    adress: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.pattern("^[0-9a-zA-ZÀ-ÿ '-.,!?]+$"),
      ],
    updateOn: 'blur'
      }
    ),

    postalCode: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.pattern("^[0-9]{5}$"),
      ],
    updateOn: 'blur'
      }
    ),

    city: new FormControl(
      "",
      {validators: [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("^[0-9a-zA-ZÀ-ÿ '-.,!?]+$"),
      ],
    updateOn: 'blur'
      }
    ),
  });

  private afficherPopup(type: 'success' | 'error') {
    if (type === 'success') {
      this.requestSent = true;
      this.requestError = false;
    } else {
      this.requestSent = false;
      this.requestError = true;
    }
  
    setTimeout(() => {
      this.requestSent = false;
      this.requestError = false;
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

      if (this.giftCardForm.valid) {
          const token = await this.recaptchaService.getToken('gift_card_form');

            const formData = {

              ...this.giftCardForm.value,
              captcha: token
            };

          this.giftCardService.postContent(this.contentType, formData).subscribe(
            () => {
              this.afficherPopup('success');
              this.giftCardForm.reset();
            },

            (error) => {
              console.error('Erreur lors de l\'envoi du message', error);
              this.afficherPopup('error');
            }
          );
      } else {
      this.giftCardForm.markAllAsTouched();
    }
  }
}