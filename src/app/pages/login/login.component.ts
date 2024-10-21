import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  });

  invalidCredentials = false;

  login(): void {
    this.loginSubscription = this.loginService.login(this.loginFormGroup.value as Credentials).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateHome();
      }, error: (error) => {
        console.error(error);
        this.invalidCredentials = true;
      }
    });
  }

  forceLogin(): void {
    this.loginSubscription = this.loginService.forceLogin().subscribe({
      next: (result: User) => {
        this.navigateHome();
      }, error: (error) => {
        console.error(error);
        this.invalidCredentials = true;
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  isFieldInvalid(field: string) {
    const formControl = this.loginFormGroup.get(field);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
