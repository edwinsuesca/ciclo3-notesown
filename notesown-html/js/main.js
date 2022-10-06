folderStatus = "";

function collapse(el){
    el.parentElement.parentElement.classList.toggle("collapse");
    el.children[0].getAttribute("src") == "./assets/img/open-folder.svg" ? folderStatus = "" : folderStatus = "open-";
    el.children[0].src = `./assets/img/${folderStatus}folder.svg`;
}

DecoupledEditor
.create( document.querySelector( '#editor' ) )
.then( editor => {
    const toolbarContainer = document.querySelector( '#toolbar-container' );

    toolbarContainer.appendChild( editor.ui.view.toolbar.element );
} )
.catch( error => {
    console.error( error );
} );