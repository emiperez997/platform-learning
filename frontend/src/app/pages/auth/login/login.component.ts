import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ThemeService } from '../../../common/services/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isDark = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private themeService: ThemeService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['admin', [Validators.required]],
    });
    this.isDark = this.themeService.getTheme() === 'dark';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return alert('Formulario no válido');
    }
    this.authService.loginObservable();
  }

  inputValid(inputName: 'email' | 'password') {
    return (
      this.loginForm.get(inputName)?.valid &&
      this.loginForm.get(inputName)?.touched
    );
  }

  inputInvalid(inputName: 'email' | 'password') {
    return (
      this.loginForm.get(inputName)?.invalid &&
      this.loginForm.get(inputName)?.touched &&
      this.loginForm.get(inputName)?.dirty
    );
  }

  getError(inputName: 'email' | 'password') {
    if (!this.loginForm.get(inputName)?.errors) {
      return null;
    }

    const errors = Object.keys(
      this.loginForm.get(inputName)?.errors as string[],
    );

    if (errors.length === 0) {
      return null;
    }

    let message = '';

    errors.forEach((error) => {
      switch (error) {
        case 'required':
          message = 'Campo requerido';
          break;
        case 'email':
          message = 'Email inválido';
          break;
        case 'minlength':
          message = 'Contraseña demasiado corta';
          break;
        default:
          break;
      }
    });

    return message;
  }
}
