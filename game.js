let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let volume;

/**
 * This Function initializes the game
 */
function init(){
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    // throwableObject = new ThrowableObject()
    // character = new Character()
    ctx = canvas.getContext("2d");   
    world.character.src = `assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png`;
    keylisteners()
    volume = new Volume(world)
}

/**
 * This Function changes the keyboard.LEFT value
 */
function left(){
    keyboard.LEFT = true;
}

/**
 * This Function changes the keyboard.LEFT value
 */
function leftStop(){
    keyboard.LEFT = false;
}

/**
 * This Function changes the keyboard.RIGHT value
 */
function right(){
    keyboard.RIGHT = true;
}

/**
 * This Function changes the keyboard.RIGHT value
 */
function rightStop(){
    keyboard.RIGHT = false;
}

/**
 * This Function changes the keyboard.UP value
 */
function up(){
    keyboard.UP = true;
}

/**
 * This Function changes the keyboard.UP value
 */
function upStop(){
    keyboard.UP = false;
}

/**
 * This Function changes the keyboard.SPACE value
 */
function space(){
    keyboard.SPACE = true;
}

/**
 * This Function changes the keyboard.SPACE value
 */
function spaceStop(){
    keyboard.SPACE = false;
}

/**
 * This Function shows the volume slide
 */
function mute(){
    if(document.getElementById("vol").style.display == "none"){
        document.getElementById("vol").style.display = "block"
    }else{
        document.getElementById("vol").style.display = "none"
    }
}

/**
 * This Function changes te keyboard values on key down
 */
function handleKeyDown(e) {
    if (e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 87) {
        keyboard.UP = true;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
}

/**
 * This function adds the eventlistener handleKeyDown 
 */
function keylisteners(){
    window.addEventListener("keydown", handleKeyDown);
}

/**
 * This Function changes te keyboard values on key up
 */
window.addEventListener("keyup", (e)=>{
    if(e.keyCode == 68){
        
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 65){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 87){
        keyboard.UP = false;
    }
    if(e.keyCode == 83){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
})

/**
 * This function removes the eventlistener handleKeyDown 
 */
function deactivateKeyListeners() {
    window.removeEventListener("keydown", handleKeyDown);
}

/**
 * This function triggers the volume function inside the volume class
 */
function volume2(){
    volume.volume()
}

/**
 * This function changes the attributes when someone opens the fullscreen
 */
let fullscreen = false;
function fullscreen1() {
    if (fullscreen === false) {
        let screenWidth = `${window.innerWidth}px`
        let screenHeight = `${window.innerHeight}px`;
        document.getElementById("buttons").style.display = "none"
        document.getElementById("canvas").style.height = "100vh"
        document.getElementById("canvas").style.width = "100vw"
        document.getElementById("canvas").style.borderRadius = "0px"
        document.getElementById("Intro").style.height = "100vh"
        document.getElementById("Intro").style.width = "100vw"
        document.getElementById("frame").style.height = "100vh"
        document.getElementById("frame").style.width = "100vw"
        document.getElementById("frame2").style.height = "100vh"
        document.getElementById("frame2").style.width = "100vw"
        document.getElementById("IntroImg").style.height = "100vh"
        document.getElementById("IntroImg").style.width = "100vw"
        document.getElementById("Screen").style.height = "100vh"
        document.getElementById("Screen").style.width = "100vw"
        document.getElementById("Screen").style.position = "absolute"
        document.getElementById("fullscreen").style.top = "auto"
        document.getElementById("fullscreen").style.left = "auto"
        document.getElementById("fullscreen").style.bottom = "30px"
        document.getElementById("fullscreen").style.right = "30px"        
        document.getElementById("Screen").style.top = 0
        document.getElementById("canvas").style.position = "absolute"
        document.getElementById("canvas").style.top = 0
        fullscreen = true;
        displayWindowSize()
    } else {
        let screenWidth = "720px"
        let screenHeight = "480px";
        document.getElementById("buttons").style.display = "flex"
        document.getElementById("canvas").style.height = screenHeight
        document.getElementById("canvas").style.width = screenWidth
        document.getElementById("canvas").style.position = "relative"
        document.getElementById("Intro").style.height = screenHeight
        document.getElementById("Intro").style.width = screenWidth
        document.getElementById("frame").style.height = screenHeight
        document.getElementById("frame").style.width = screenWidth
        document.getElementById("frame2").style.height = screenHeight
        document.getElementById("frame2").style.width = screenWidth
        document.getElementById("IntroImg").style.height = screenHeight
        document.getElementById("IntroImg").style.width = screenWidth
        document.getElementById("Screen").style.height = screenHeight
        document.getElementById("Screen").style.width = screenWidth
        document.getElementById("Screen").style.position = "relative"
        // document.getElementById("fullscreen").style.top = "440px"
        // document.getElementById("fullscreen").style.left = "680px"
        // document.getElementById("fullscreen").style.bottom = "auto"
        // document.getElementById("fullscreen").style.right = "auto"        
        document.getElementById("Screen").style.top = "-90px"
        fullscreen = false;
        displayWindowSize()
    }
}

/**
 * This intervall 
 */
// setInterval(()=>{
//     let screenWidth = `${window.screen.width}px`
//     let screenHeight = `${window.screen.height}px`;

// }, 200)
/**
 * This function reloads the page
 */
function restart(){
    // init()
    // document.getElementById("frame").style.display = "none"
    // document.getElementById("restart").style.display = "none"
    // window.addEventListener("keydown", handleKeyDown);
    location.reload()
}
/**
 * This function changes the window size
 */
function displayWindowSize() {
    if(fullscreen===false){
        let canvasHeight;
    let canvasWidth;
    let condi = false
    // document.addEventListener('DOMContentLoaded', (event) => {
        if(window.innerWidth < 720){
            document.getElementById("rotate").style.display = "flex"
        }
        
        if(window.innerHeight < 480){
            canvasHeight = "100%"
            let ratio = window.innerHeight/480
            canvasWidth = 720*ratio+"px"
            condi = true
        }

        if(window.innerHeight >= 480){
            canvasHeight = "480px"
        }

        if(window.innerWidth < 720 && condi == false){
            canvasWidth = "100%"    
            let ratio = window.innerWidth/720
            canvasHeight = 480*ratio+"px"
            
        }

        if(window.innerWidth >= 720){
            canvasWidth = "720px"
        }
        setTimeout(()=>{

            document.getElementById("canvas").style.height = canvasHeight;
            document.getElementById("canvas").style.width = canvasWidth;

            document.getElementById("Intro").style.height = canvasHeight;
            document.getElementById("Intro").style.width = canvasWidth;

            document.getElementById("Screen").style.height = canvasHeight;
            document.getElementById("Screen").style.width = canvasWidth;

            document.getElementById("frame").style.height = canvasHeight;
            document.getElementById("frame").style.width = canvasWidth;

            document.getElementById("frame2").style.height = canvasHeight;
            document.getElementById("frame2").style.width = canvasWidth;

            document.getElementById("IntroImg").style.height = canvasHeight;
            document.getElementById("IntroImg").style.width = canvasWidth;
        },500)
    }
}    

    // Apply the same height and width to the other elements
    

    

/**
 * This function triggers the function displayWindowSize on resize
 */
window.addEventListener('resize', displayWindowSize);
displayWindowSize();
