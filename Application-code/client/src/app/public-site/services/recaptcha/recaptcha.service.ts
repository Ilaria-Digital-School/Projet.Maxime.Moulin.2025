import { Injectable } from '@angular/core';
import { CookieConsentService } from './../cookie-consent/cookie-consent.service';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

@Injectable({
  providedIn: 'root'
})

export class RecaptchaService {
  constructor(private cookieConsent: CookieConsentService) {
      this.cookieConsent.consent$.subscribe((consent) => {
        if (consent && !this.scriptLoaded) {
          this.load(); // Charge le script automatiquement dès que le consentement est donné
        }
      });
    }

  private siteKey: string = '6Le96zcrAAAAALSvK3leZcvHRa6EyhtE4GjqsMBs';
  private scriptLoaded: boolean = false;
  private loadingPromise: Promise<void> | null = null;

  load(): Promise<void> {
    if (!this.cookieConsent.getConsent()) return Promise.reject("Consentement non donné");

    if (this.scriptLoaded) {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      script.onerror = () => reject('Erreur lors du chargement du script reCAPTCHA');

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }

  async getToken(action: string): Promise<string> {
    await this.load();
    
    return new Promise<string>((resolve, reject) => {
      if (!window.grecaptcha) {
        reject('reCAPTCHA n\'est pas chargé');
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(this.siteKey, { action }).then(resolve).catch(reject);
      });
    });
  }
}
