import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private router: Router){}
  helper = new JwtHelperService();
  token = localStorage.getItem("sesion");
  decodedToken: any;
  expirationDate: Date;
  isExpired:boolean;

  ngOnInit(): void {
    setTimeout(() => {
      this.token = localStorage.getItem("sesion");
      this.TokenExpiration(this.token);
    }, 10);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.token = localStorage.getItem("sesion");
      this.TokenExpiration(this.token);
    }, 10);
  }

  TokenExpiration(tkn: string): void {
    if(tkn) {
    this.token = tkn;
    this.decodedToken = this.helper.decodeToken(tkn);
    this.expirationDate = this.helper.getTokenExpirationDate(tkn);
    this.isExpired = this.helper.isTokenExpired(tkn);
    }
    console.log(
      this.token,
      this.decodedToken,
      this.expirationDate,
      this.isExpired
    );

    if (this.isExpired) {
      this.router.navigate(['']);
    } else{
      this.router.navigate(['editor']);
    }
  }

}
