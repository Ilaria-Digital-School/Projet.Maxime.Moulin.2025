import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart} from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CookieConsentComponent } from '../../components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-public-site',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieConsentComponent],
  templateUrl: './public-site.component.html',
  styleUrl: './public-site.component.css'
})
export class PublicSiteComponent {
  title = 'client';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); // Remonte instantanément AVANT navigation
      }, 10);
    }
    });
  }
}
