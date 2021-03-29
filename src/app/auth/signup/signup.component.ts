import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp(signupForm: NgForm) {
    if (!signupForm.valid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.signUp(signupForm.value.username, signupForm.value.password);
    authObs.subscribe(resData => {
        this.error = "";
        this.isLoading = false;
    }, error => {
      this.error = error;
      this.isLoading = false;
    });
    signupForm.reset();
  }

}
