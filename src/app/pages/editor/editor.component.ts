import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  public Editor = ClassicEditor;
  statusExplorer = false;

  noteOnEdition = {
    "id": 1,
    "name" : "Titulo",
    "description" : "",
    "parentFolder" : "",
    "lastEditor" : "",
    "panel": 0
  }
  folder = 0;
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
  }
  viewPanel(event:any, panelId:number){
    this.folder = panelId;
    for(let i=0; i < event.target.parentNode.childElementCount; i++){
      event.target.parentNode.children[i].classList.remove("active")
    }
    event.target.classList.add("active")
  }

  public isDisabled = false;
  //Deshabilitar edición del editor
  toggleDisabled() {
      this.isDisabled = !this.isDisabled
  }
  //Acciones que se ejecutan cuando cambia el contenido del editor

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.noteOnEdition.description = data;
    this.updateNote();
  }

//Leer nota enviada desde el panel
  readNote(data:any){
    this.noteOnEdition.id = data.id;
    this.noteOnEdition.name = data.name;
    this.noteOnEdition.description = data.description;
    this.noteOnEdition.parentFolder = data.parentFolder;
    this.noteOnEdition.lastEditor = data.lastEditor;
    this.noteOnEdition.panel = data.panel;
  }

  updateNote(){
    let newValuesNote = {
      'id': this.noteOnEdition.id,
      'name': this.noteOnEdition.name,
      'description': this.noteOnEdition.description,
      'parentFolder': this.noteOnEdition.parentFolder,
      'lastEditor': this.noteOnEdition.lastEditor,
      'panel': this.noteOnEdition.panel
    }
    this.api.updateNote(newValuesNote.id, newValuesNote).subscribe( data =>{
/*       this.router.navigateByUrl('/folders', {skipLocationChange: true}).then(()=> this.router.navigate(["editor"])); */
    })
  }
}
