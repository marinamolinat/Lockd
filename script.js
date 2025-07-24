const timeText = document.querySelector("#time");

let windowElements = document.getElementsByClassName("window");
const submitCountDownButton = document.getElementById("submitCountDownButton");
const display = document.getElementById("countdownDisplay");
let timeValue = null;
const spaceSubmit = document.getElementById("spaceSubmitButton");
const mediaSubmit = document.getElementById("mediaSubmitButton")
const startButton = document.getElementById("startButton");
let pause = true;
const timerButton = document.getElementById("timerButton");
const pomodoroButton = document.getElementById("choosePomodoroButton");
const pomodoroDisplay = document.getElementById("pomodoroDisplay");
let pomodoroMinutes = 20;
let isPomodoro = false;
let minutes = 0;
let seconds = 0;
let timer;
const pomodoroSubmitSettings = document.getElementById("pomodoroSubmitSettings");
const resetButton = document.getElementById("resetButton");
const audioFinish = new Audio('audio/beauty.wav');
let endTime;
let startTime;








//time and countDown
function updateTime() {
    //current time
        let currentTime = new Date().toLocaleString();
        timeText.innerHTML = currentTime;


        //count down
        if(!timeValue){
            display.innerText = `CountDown`;
    


        }
        else 
        {
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



submitCountDownButton.addEventListener("click", function() {
    
   

    const input = document.getElementById("inputDate");

    timeValue = input.value;

    
});


//pomodoro
// and stop watch
pomodoroButton.addEventListener("click", function() {
    
    if (!isPomodoro){
        isPomodoro = true;
        reset();
    }
   
    

});

timerButton.addEventListener("click", function() {

    if(isPomodoro){
        isPomodoro = false;
        reset();

    }


});



startButton.addEventListener("click", function(){
    pause = !pause;

    
    if (pause){
        startButton.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                    </svg>`;
        clearInterval(timer);


    }

    else{
        
        if (isPomodoro){
            
            endTime = (minutes * 60000) + (seconds * 1000)  + Date.now(); //millie seconds

            timer = setInterval(updateTimerPomodoro, 500);

            }
        else {

            //stopwatch is just starting 
                startTime = Date.now() - (minutes * 60000) - (seconds * 1000);

                timer = setInterval(updateTimerStopwatch, 1000)
            }

       startButton.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
        </svg>`;


    }

}); 


function updateTimerPomodoro() {
    let timeLeft = endTime -  Date.now();

    
    if (timeLeft <= 0) {
        reset()
        audioFinish.play();
        alert('Time is up! Take a break.');
    }

    else if (!pause) 
    {
        seconds = Math.floor(timeLeft/1000);
        minutes = Math.floor(seconds/60);
        seconds = seconds % 60;
    
    }
    //display time
    pomodoroDisplay.innerHTML =  `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
}

function updateTimerStopwatch() {
    const timerElement = document.getElementById('timer');
    let timeTranspired = Date.now() - startTime;
    if (!pause) 
    {
        seconds = Math.floor(timeTranspired/1000);
        minutes = Math.floor(seconds/60);
        seconds = seconds % 60;
    
    }


    //displays time
    pomodoroDisplay.innerHTML =  `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    
    
}





resetButton.addEventListener("click", function(){

    reset();
      
    

});


function reset() {
    //first, pause the time and stop timer
    pause = true;
    startButton.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                    </svg>`;
        
    clearInterval(timer);
      
    seconds = 0;
      if (isPomodoro){
        minutes = pomodoroMinutes;

      }
      else{
        minutes = 0;
      }
      pomodoroDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      
    
}





//change pomodoro minutes
pomodoroSubmitSettings.addEventListener("click", function(){
    const pomodoroInputMinutes = document.getElementById("pomodoroInputMinutes");
    pomodoroMinutes = pomodoroInputMinutes.value;
    
    if (isPomodoro){
        reset()


    }



});








spaceSubmit.addEventListener("click", function() {
    const input = document.getElementById("inputSpace")
    const url = input.value;
    const testImage = new Image();

    testImage.onload = function () {
    // Only set background if image loads successfully
    document.body.style.backgroundImage = `url("${url}")`;
  };

  testImage.onerror = function () {
   alert("Error, image is not valid")
  };

  testImage.src = url;
    

})

mediaSubmit.addEventListener("click", function() {
    const input = document.getElementById("inputMedia")
    const url = input.value;
    const testImage = new Image();

    testImage.onload = function () {

    // Only set background if image loads successfully
    document.querySelector(".imagee").style.backgroundImage = `url("${url}")`;

  };

  testImage.onerror = function () {
   alert("Error, image is not valid")
  };

  testImage.src = url;
    

})



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


document.querySelectorAll('.buttonSpace').forEach(button => {
  button.addEventListener('click', function () {
    const img = button.querySelector('img'); // Get the image inside the button
    if (img) {
      document.body.style.backgroundImage = `url("${img.src}")`;
    }
   
  });
});


function getVideoId(url) {
    const match = url.match(/[?&]v=([^&#]+)/);
    return match ? match[1] : null;
 
}

document.getElementById("submitMusicYT").addEventListener("click", function(){
    console.log('hey');
    const input = document.querySelector("#lowerDiv input");
    const iframe =  document.querySelector("#musicYTWindow .content iframe");
    const idd = getVideoId(input.value);
    console.log(idd);
    iframe.src = `https://www.youtube.com/embed/${idd}`;
 

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
  
  // Calculate cursor movement
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;

  // Get proposed new position
  let newTop = elmnt.offsetTop - pos2;
  let newLeft = elmnt.offsetLeft - pos1;

  // Get dimensions
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const elemWidth = elmnt.offsetWidth;
  const elemHeight = elmnt.offsetHeight;

  // Clamp within window bounds
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + elemWidth > winWidth) newLeft = winWidth - elemWidth;
  if (newTop + elemHeight > winHeight) newTop = winHeight - elemHeight;

  // Apply clamped values
  elmnt.style.top = newTop + "px";
  elmnt.style.left = newLeft + "px";
}

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}