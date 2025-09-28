import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../passMatchValidator';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { MatDialogRef } from '@angular/material/dialog';

export const TOKEN = 'token';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cardServ = inject(CardService);
  LoginForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
constructor() {}
  onSubmit() {
    if (this.LoginForm.valid) {
      this.cardServ.login(this.LoginForm.value).subscribe({              //nonullableFormBuilder//

        next: (res) => {
          localStorage.setItem(TOKEN, JSON.stringify(this.LoginForm.value));
          this.router.navigate(['/prod']);
        },
        error: (err) => {
          console.log('login failed', err);
          alert('Invalid Credentials, please try again');
        }

      });
    }
  }
}
