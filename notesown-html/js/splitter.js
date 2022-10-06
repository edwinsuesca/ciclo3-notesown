splitter = document.getElementById("splitter");
editor = document.getElementById("editor");
toolbarContainer = document.getElementById("toolbar-container");
var sliderPress = false;
/* document.addEventListener("DOMContentLoaded", function(){
    splitters = document.getElementsByClassName("splitter");
    for(i=0; i < splitters.length; i++){
        widthFirstChild = splitters[i].parentElement.children[0].clientWidth;
        splitters[i].style.left = `${widthFirstChild - 7.5}px`
    }

}) */

splitter.onmousedown = function(event) { 
    event.preventDefault();
    sliderPress = true;
    splitter.style.position = 'absolute';
    moveAt(event.pageX);

    function moveAt(pageX) {
        if(pageX > 200 && pageX < 600 && sliderPress){
            splitter.style.left = pageX + 'px';
        }
    }

    function onMouseMove(event) {
        moveAt(event.pageX);
        if(event.pageX > 200 && sliderPress){
            splitter.parentElement.children[0].style.width = `${event.pageX}px`;
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    splitter.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        splitter.onmouseup = null;
        if(splitter.parentElement.children[0].clientWidth == 0){
            splitter.style.left = '0';
        }
    };
};

splitter.onmouseover = function(event) {

}
window.onmouseup = function(event) {
    sliderPress = false;
}

window.onresize = function(){
    widthEditorParent = splitter.parentElement.children[2].clientWidth;
    editor.style.width = `widthEditorParent${widthEditorParent}px`;
    toolbarContainer.style.width = `widthEditorParent${widthEditorParent}px !important`;
};

window.onload = function(){
    widthEditorParent = splitter.parentElement.children[2].clientWidth;
    editor.style.width = `widthEditorParent${widthEditorParent}px`;
    toolbarContainer.style.width = `widthEditorParent${widthEditorParent}px !important`;
};
