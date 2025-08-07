import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { ReviewFormComponent } from "./components/review-form/review-form.component";
import { MassagesComponent } from "./components/massages/massages.component";
import { MassageFormComponent } from "./components/massage-form/massage-form.component";
import { ProgramsComponent } from "./components/programs/programs.component";
import { ProgramsFormComponent } from "./components/programs-form/programs-form.component";
import { AuthGuard } from "./../core/guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard',
         component: DashboardComponent,
          canActivate: [AuthGuard],
          children: [
            { path: 'home', component: HomeComponent},
            { path: 'avis', component: ReviewsComponent},
            { path: 'avis/new', component: ReviewFormComponent},
            { path: 'avis/edit/:id', component: ReviewFormComponent},
            { path: 'massages', component: MassagesComponent},
            { path: 'massages/new', component: MassageFormComponent},
            { path: 'massages/edit/:id', component: MassageFormComponent},
            { path: 'programmes', component: ProgramsComponent},
            { path: 'programmes/new', component: ProgramsFormComponent},
            { path: 'programmes/edit/:id', component: ProgramsFormComponent},
        ]
    },

];