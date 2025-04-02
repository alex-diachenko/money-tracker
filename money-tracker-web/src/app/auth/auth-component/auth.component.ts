import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-auth-component',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  authForm: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string | null>,
  }>;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email],),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
}
