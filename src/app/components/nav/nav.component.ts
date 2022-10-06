import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('found') found!: ElementRef;
  resultSearch = [];
  username:string = localStorage.getItem("username");
  constructor(private api:ApiService, private router:Router) { }
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.username = localStorage.getItem("username");
    }, 10);
  }

  showMenuUser(menu:any){
    menu.classList.toggle("show");
  }

  searchContent(value:any){
    this.api.getNotesByContent(value).subscribe(data => {
      this.found.nativeElement.innerHTML = "";
      this.resultSearch = data;
      if(this.resultSearch.length == 0){
        this.found.nativeElement.innerHTML = `<span class="itemResult">Sin resultados</span>`
      } else {
        for(let i = 0; i < this.resultSearch.length; i++){
          this.found.nativeElement.innerHTML += `
            <div class="itemResultContainer">
              <span class="itemResult">${this.resultSearch[i].description}</span>
              <a class="route"><span>Aparece en: </span> ${this.resultSearch[i].parentFolder} > ${this.resultSearch[i].name}</a>
            </div>
          `
        }
      }
    })
  }

  logout(){
    localStorage.removeItem("sesion");
    localStorage.removeItem("username");
    this.router.navigate(['login'])
  }
}
