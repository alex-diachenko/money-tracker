import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { asyncScheduler } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-component',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  signedUp: boolean = false;
  authForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  signIn(): void {
    const { email, password } = this.authForm.value;
    this.authService
      .signIn(email as string, password as string)
      .subscribe((data: string) => {
        this.authService.saveToken(data);
        this.router.navigate(['/dashboard']);
      });
  }

  signUp(): void {
    const { email, password } = this.authForm.value;
    this.authService
      .signUp(email as string, password as string)
      .subscribe(() => {
        this.signedUp = true;
        asyncScheduler.schedule(() => {
          this.signedUp = false;
        }, 10000);
      });
  }

  private initializeForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
}
