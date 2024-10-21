import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

  private router = inject(Router);
  loginService = inject(LoginService);

  private logoutSubscription: Subscription | null = null;

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: _ => {
        this.navigateToLogin();
      },
      error: error => {
        this.navigateToLogin();
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
      this.logoutSubscription?.unsubscribe();
  }

}
