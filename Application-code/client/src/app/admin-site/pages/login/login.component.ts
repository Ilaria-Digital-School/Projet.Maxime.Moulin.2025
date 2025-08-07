import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  logoUrl = environment.imagesMainUrl + '/images/Logo.webp';

  loginForm = new FormGroup({
    
    email: new FormControl(
      '',
      [
      Validators.required,
      Validators.email
      ]
    ),

    password: new FormControl(
      '',
      [
      Validators.required,
      Validators.minLength(6)
      ]
    )

  });

  onSubmit() {
    this.authService.login(this.loginForm.controls.email.value as string, this.loginForm.controls.password.value as string).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/admin/dashboard/home']);
      },
      error: (err) => {
        this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.';
        console.error('Login error:', err);
      }
    });
  }
}