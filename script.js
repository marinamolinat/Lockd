let timeText = document.querySelector("#time");

let windowElements = document.getElementsByClassName("window");
let closeButtons = document.getElementsByClassName("close");




function updateTime() {
        let currentTime = new Date().toLocaleString();
        timeText.innerHTML = currentTime;
    }
    setInterval(updateTime, 1000);

updateTime();






//close button
document.querySelectorAll('.close').forEach(button => {
  button.addEventListener('click', function () {

    const parent = button.closest('.window'); 
    if (parent) {
      parent.style.display = 'none';
    }
  });
});

for (let el of windowElements) {
    dragElement(el);
 
}





// Courtesy of w3 school
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (elmnt.querySelector(".windowheader")) {
    /* if present, the header is where you move the DIV from:*/
    elmnt.querySelector(".windowheader").onmousedown = dragMouseDown; 
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}