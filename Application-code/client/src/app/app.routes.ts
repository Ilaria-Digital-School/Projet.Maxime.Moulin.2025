import { Routes } from '@angular/router';
import { PublicSiteComponent } from './public-site/pages/public-site/public-site.component';
import { PUBLIC_ROUTES } from './public-site/public.routes';
import { ADMIN_ROUTES } from './admin-site/admin.routes';

export const routes: Routes = [
    { 
        path: "",
        component: PublicSiteComponent,
        loadChildren: () => import('./public-site/public.routes').then(m => m.PUBLIC_ROUTES),
    },
    {
        path: "admin",
        loadChildren: () => import('./admin-site/admin.routes').then(m => m.ADMIN_ROUTES),
    },
    {
        path: '**',
        redirectTo: '',
    },
];