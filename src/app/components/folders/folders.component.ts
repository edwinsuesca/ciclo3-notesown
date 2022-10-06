import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicMenuDirective } from 'src/app/directives/dynamic-menu.directive';
import { ContextualMenuComponent } from '../contextual-menu/contextual-menu.component';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  @ViewChild(DynamicMenuDirective) dynamic!: DynamicMenuDirective;
  @Output() datosNota = new EventEmitter<any>();

  viewContainerRef: ViewContainerRef;
  menuOptions:any = [];
  itemsInPanel;
  folderAlter:any;
  
  constructor(private api:ApiService) { }
  ngOnInit(): void {
    this.getFolders(0);

  }
  
  toggleFolder(folder:any){
    folder.parentNode.children[1].classList.toggle("notesContainerHidden");
  }

  selectNote(folder:any, note:any){
    let nFolders = folder.parentNode.parentNode.childElementCount;
    let parent = folder.parentNode.parentNode;
    for(let i=0; i < nFolders; i++){
      parent.children[i].children[0].classList.remove("folderActive")
    }
    folder.classList.add("folderActive");
    //Enviar datos al editor
    this.datosNota.emit(note);
  }

  renameItem(){
    console.log("Doble clic")
  }

  contextMenu(item:any, event:any){
    this.viewContainerRef = this.dynamic.viewContainerRef;
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent<any>(ContextualMenuComponent);
    let position = {"x":event.clientX, "y":event.clientY};
    this.menuOptions = [item, position];
    componentRef.setInput('menuOptions', this.menuOptions);
  }

  getFolders(panel){
    this.api.getAllFoldersByIdPanel(panel).subscribe(data =>{
      this.itemsInPanel = data;
    });
  }

  newNote(containerNotes:any, folder_id:any){
    this.api.addNote(folder_id, 28).subscribe(data =>{
      this.getFolders(0);
      this.folderAlter = folder_id;
    })
  }
}