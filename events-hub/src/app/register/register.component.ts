import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';
export type User = {
  email: string,
  password: string,
  partner: boolean
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    partner: true
  };
  errors = {
    email: '',
    password: '',
    rePassword: ''
  }
  cannotBeSubmitted = true;
  rePassword = '';
  constructor(private api: ApiService, private router: Router) {
    this.api.query("getUsers", this.user).then((res) => { console.log("getUsers", res) })
  }
  registerError: string = '';

  ngOnInit(): void {

  }
  onChangeEvent(event: any) {

    console.log(event.target.value);
    let emailVerif = this.verifyEmail(this.user.email);
    let passVerif = this.verifyPasswords(this.user.password, this.rePassword);
    if (!emailVerif || passVerif)
      this.cannotBeSubmitted = true;
    if (emailVerif && passVerif)
      this.cannotBeSubmitted = false;

  }
  openSnackBar(message: string, action: string) {
    // this.snackBar.open(message, action);
    console.log(message);
  }
  onFormSubmitted() {
    console.log(this.user);
    const that = this;
    if (!this.cannotBeSubmitted) {
      const opt = {
        email: this.user.email,
        password: Md5.init(this.user.password),
        partner: this.user.partner
      }
      this.api.query("insertUser", opt)
        .then((res) =>{
          console.log("insertUser", res)
          if (res.rowsAffected != 0) {
            that.router.navigate(['']);
            that.openSnackBar("Utilizator adăugat cu succes!", "Okay")
          }
          else that.openSnackBar("A intervenit o eroare...", "Trist")
        })
        .catch(err => {
         this.registerError = err.error;
        })
    }

  }


  verifyEmail(email: string) {

    //verificare complexa email
    if (!email) {
      this.errors.email = "Câmpul email este obligatoriu!";
      return false;
    }
    if (email.includes(' ')) {
      email = email.trim();

    }
    if (new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
      this.errors.email = '';
      return true;

    }
    else {
      this.errors.email = "Format incorect";
      return false;
    }


  }

  verifyPasswords(pass1: string, pass2: string) {
    let okay = false;
    if (!pass1) {
      this.errors.password = "Câmpul parolă este obligatoriu!";
      okay = false;
    }
    else this.errors.password = "";


    if (!pass2) {
      this.errors.rePassword = "Câmpul reintroducere parolă este obligatoriu!";
      okay = false;
    }
    else this.errors.rePassword = "";


    if (pass1 != pass2) {
      this.errors.rePassword = "Parolele trebuie să fie identice!";
      okay = false;
    }
    else if (pass1 && pass2 && pass1 == pass2) {
      this.errors.password = this.errors.rePassword = '';
      okay = true;
    }


    return okay;

  }
}
