const timeText = document.querySelector("#time");

let windowElements = document.getElementsByClassName("window");
const countDownButton = document.getElementById("countdownButton");
const display = document.getElementById("countdownDisplay");
let timeValue = null;



//time and countDown
function updateTime() {
    //current time
        let currentTime = new Date().toLocaleString();
        timeText.innerHTML = currentTime;


        //count down
        if(!timeValue){
            display.innerText = `CountDown`;


        }
        else {
             //Unix time babyy
        currentTime = new Date().getTime();
        let countDownDate = new Date(timeValue).getTime();
        let distance = countDownDate-currentTime;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        display.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;


        }
    }

setInterval(updateTime, 1000);



countDownButton.addEventListener("click", function() {
   

    const input = document.getElementById("inputDate");

    timeValue = input.value;


    
});








//close button
document.querySelectorAll('.close').forEach(button => {
  button.addEventListener('click', function () {

    const parent = button.closest('.window'); 
    if (parent) {
      parent.style.display = 'none';
    }
  });
});

//open button
document.querySelectorAll('.open').forEach(button => {
  button.addEventListener('click', function () {
    for (let el of windowElements) {
        if (button.id === el.id + "Button")
        {
            el.style.display = 'flex';
        }
 
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