import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { CookieConsentService } from '../../services/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  imports: [NgIf],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.css'
})

export class CookieConsentComponent implements OnInit {
  hasConsented: boolean = true;

  constructor(private consentService: CookieConsentService) {}

  ngOnInit(): void {
    this.hasConsented = this.consentService.getConsent();

    this.consentService.consent$.subscribe(consent => {
      this.hasConsented = consent;
    });
  }

  acceptCookies() {
    this.consentService.setConsent(true);
    this.hasConsented = true;
  }

  refuseCookies() {
    this.consentService.setConsent(false);
    this.hasConsented = true;    
  }
}
