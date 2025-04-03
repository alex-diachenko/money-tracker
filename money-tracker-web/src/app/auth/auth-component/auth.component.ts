import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../shared/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth-component',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  authForm: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string | null>,
  }>;

  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {
    this.initializeForm();

    this.authForm.valueChanges.subscribe(data => {
      console.log(data);
      console.log(this.authForm);
    })
  }

  signIn(): void {
    // this.httpService.post();
  }

  signUp(): void {
    // this.httpService.post();
  }

  private initializeForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email],),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
}
