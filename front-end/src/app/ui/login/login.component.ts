import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // userAuthForm: FormGroup;
  formLogin = new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null),
  })

  constructor(private apiUser: UserService, private router: Router) {
    // if (this.apiUser.getToken()) {
    //   this.router.navigate(["/"]);
    // }
  }

  ngOnInit(): void {
  }

  login() {
    this.apiUser.auth(this.formLogin.value);
    this.router.navigate(["/"]);
  }

}
