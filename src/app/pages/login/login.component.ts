import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  })
  @Output() sesion = new EventEmitter<boolean>();
  errorStatus:boolean = false;
  errorMsj:string;

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    //this.validateSesion()
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.api.login(this.loginForm.value).pipe(
      tap((data) => {
        console.log(data.user)
        if(data.status == "ok"){
          localStorage.setItem("sesion", data.response);
          this.getUserByEmail(data.user.email)
          this.router.navigate(['editor'])
        } else{
          this.errorStatus = true;
          this.errorMsj = data.response;
      }
        this.router.navigate(['editor'])
      })
    ).subscribe();
  }

  getUserByEmail(email:string){
    this.api.getUserByEmail(email).subscribe(data =>{
      let user = {
        "id": data.id,
        "name": data.name,
        "lastname": data.lastname,
        "email": data.email,
      }
      localStorage.setItem("username", `${user.name} ${user.lastname}`);
      localStorage.setItem("ID", user.id);
    });
  }

  register(){
    this.router.navigate(['register'])
  }
}
