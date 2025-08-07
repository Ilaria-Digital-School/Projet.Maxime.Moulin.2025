import { Routes } from "@angular/router";
import { AccueilComponent } from "./pages/accueil/accueil.component";
import { MassagesComponent } from "./pages/massages/massages.component";
import { AproposComponent } from "./pages/apropos/apropos.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { CarteCadeauComponent } from "./pages/carte-cadeau/carte-cadeau.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { GeneralConditionsComponent } from "./pages/general-conditions/general-conditions.component";

export const PUBLIC_ROUTES: Routes = [
    { path: "", redirectTo: "accueil", pathMatch: "full" },
    { path: "reservation", redirectTo: "contact", pathMatch: "full" },
    { path: "accueil", component: AccueilComponent, title: "Au cœur des lilas | Massages à domicile" },
    { path: "massages", component: MassagesComponent, title: "Massages et prestations | Au cœur des lilas" },
    { path: "a-propos", component: AproposComponent, title: "A propos | Au cœur des lilas" },
    { path: "contact", component: ContactComponent, title: "Contact | Au cœur des lilas" },
    { path: "carte-cadeau", component: CarteCadeauComponent, title: "Carte cadeau | Au cœur des lilas" },
    { path: "privacy", component: PrivacyPolicyComponent, title: "Politique de confidentialité | Au cœur des lilas" },
    { path: "terms", component: GeneralConditionsComponent, title: "Mentions légales | Au cœur des lilas" },
];