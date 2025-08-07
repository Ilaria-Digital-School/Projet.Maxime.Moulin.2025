import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  constructor() { }

  private consentKey = 'cookie_consent';
  private consentSubject = new BehaviorSubject<boolean>(this.getStoredConsent());

  consent$ = this.consentSubject.asObservable();

  private getStoredConsent(): boolean {
    return localStorage.getItem(this.consentKey) === 'true';
  }

  getConsent(): boolean {
    return this.consentSubject.value;
  }

  setConsent(value: boolean): void {
    localStorage.setItem(this.consentKey, value.toString());
    this.consentSubject.next(value);
  }

}
