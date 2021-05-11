import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  InputEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  InputContrasena = new FormControl('', [
    Validators.required,
  ]);
  hide = true;
  matcher = new MyErrorStateMatcher();
  constructor() { }

  ngOnInit(): void {
  }

}
