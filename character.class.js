class Character extends MovableObject{
    x = 20
    y = 300
    height = 120
    width = 80
    speed = 3;
    energy = 100
    bottles = 1
    IMAGES_WALKING = [
        "assets/img/cropped-W-21.png",
        "assets/img/cropped-W-22.png",
        "assets/img/cropped-W-23.png",
        "assets/img/cropped-W-24.png",
        "assets/img/cropped-W-25.png",
        "assets/img/cropped-W-26.png"
    ];

    IMAGES_JUMPING = [
        "assets/img/cropped-J-31.png",
        "assets/img/cropped-J-32.png",
        "assets/img/cropped-J-33.png",
        "assets/img/cropped-J-34.png",
        "assets/img/cropped-J-35.png",
        "assets/img/cropped-J-36.png",
        "assets/img/cropped-J-37.png",
        "assets/img/cropped-J-38.png",
        "assets/img/cropped-J-39.png",
    ];

    IMAGES_DEAD = [
        "assets/img/cropped-D-51.png",
        "assets/img/cropped-D-52.png",
        "assets/img/cropped-D-53.png",
        "assets/img/cropped-D-54.png",
        "assets/img/cropped-D-55.png",
        "assets/img/cropped-D-56.png",
        "assets/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png",
    ]

    IMAGES_HURT =[
        "assets/img/cropped-H-41.png",
        "assets/img/cropped-H-42.png",
        "assets/img/cropped-H-43.png"
    ]

    IMAGES_IDLE = [
        "assets/img/cropped-I-1.png",
        "assets/img/cropped-I-2.png",
        "assets/img/cropped-I-3.png",
        "assets/img/cropped-I-4.png",
        "assets/img/cropped-I-5.png",
        "assets/img/cropped-I-6.png",
        "assets/img/cropped-I-7.png",
        "assets/img/cropped-I-8.png",
        "assets/img/cropped-I-9.png",
        "assets/img/cropped-I-10.png",
        "assets/img/cropped-I-11.png",
        "assets/img/cropped-I-12.png",
        "assets/img/cropped-I-13.png",
        "assets/img/cropped-I-14.png",
        "assets/img/cropped-I-15.png",
        "assets/img/cropped-I-16.png",
        "assets/img/cropped-I-17.png",
        "assets/img/cropped-I-18.png",
        "assets/img/cropped-I-19.png",
        "assets/img/cropped-I-20.png",
    ]

    keyboard;
    world;
    walking_sound = new Audio('assets/sounds/running2.mp3')
    background_sound = new Audio('assets/sounds/backgroundsound.mp3');
    lastAttach = 10
    passedtime3
    condition3 = false
    condition5 = false
    condi1 = false

    constructor(){
        super().loadImage("assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png")
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.background_sound.volume = 0.5;
        this.applyGravity();
        this.animate();
    }
    /**
     * This function animates the character
     */
    animate() {
        setInterval( () => {
            if(world.keyboard.RIGHT && this.condi1 == false || world.keyboard.LEFT && this.condi1 == false ){
                this.background_sound.play()
                this.condi1 = true
            }
            let passedtime2 = new Date().getTime();
            this.passedtime3 = ((passedtime2/1000) - this.lastAttach)
            this.walking_sound.pause();
            if(world.keyboard.RIGHT || world.keyboard.LEFT || world.keyboard.UP || world.keyboard.DOWN || world.keyboard.SPACE){
                let lastAttach2 = new Date().getTime();
                this.lastAttach = lastAttach2 / 1000;
            }
            if(world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight()
                this.walking_sound.play();
                this.otherDirection = false;
            }
            if(world.keyboard.LEFT && this.x > 0 ){
                this.moveLeft()
                this.walking_sound.play();
                this.otherDirection = true;
            }
            if(this.world.keyboard.UP && !this.isAboveGround()){
                this.jump()
            }

            this.world.camera_x = - this.x + 100
        }, 1000 / 60)

        setInterval( () => {
            if(this.isDead()){
                if(this.condition5 == false){
                    this.condition5 = true
                this.playSequenceD(this.IMAGES_DEAD)
                }
                world.level.enemies.splice(0);
            }else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT)
            }else if(this.isAboveGround()){
                if(this.condition3 == false){
                    this.condition3 = true
                    this.playSequenceJ(this.IMAGES_JUMPING)
                }
            }else if(world.character.passedtime3 > 10){
                this.playAnimation(this.IMAGES_IDLE)
            }else{
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.IMAGES_WALKING)
                }   
            }
        }, 100);
    }
    /**
     * This function changes the SpeedY value of the character
     */
    jump(){
        this.speedY = 30;
    }
    /** 
     * This function changes the x value of the character
     */
    moveRight(){
        this.x += this.speed
    }
    /**
     * This function changes the x value of the character
     */
    moveLeft(){
        this.x -= this.speed
    }
    /**
    This function changes the energy value of the character
     */
    hit(){
        if(this.energy > 0){
            this.energy -= 20
        }
    }
    /**
     * This function checks if the energy of the character is 0
     */
    isHurt(){
        return this.energy == 0
    }
    /**
     * This function reduces the ammount of the bottles inside the character class
     */
    throw(){
        if(this.bottles > 0){
            this.bottles -= 1
        }
    }

    /**
     * This function triggers the jump sequence
     */
    playSequenceJ() {
        if (!world.character) {
            console.error("world.character is undefined");
            return;
        }
    
        if (this.condition2 == false) {
            this.condition2 = true;
            const imgElement = new Image();
            imgElement.src = "assets/img/cropped-J-31.png";
            imgElement.style.transform = "scaleX(-1)";
            world.character.img = imgElement;
    
            setTimeout(() => {
                imgElement.src = "assets/img/cropped-J-32.png";
                setTimeout(() => {
                    imgElement.src = "assets/img/cropped-J-33.png";
                    setTimeout(() => {
                        imgElement.src = "assets/img/cropped-J-34.png";
                        setTimeout(() => {
                            imgElement.src = "assets/img/cropped-J-35.png";
                            setTimeout(() => {
                                imgElement.src = "assets/img/cropped-J-36.png";
                                setTimeout(() => {
                                    imgElement.src = "assets/img/cropped-J-37.png";
                                    setTimeout(() => {
                                        imgElement.src = "assets/img/cropped-J-38.png";
                                        setTimeout(() => {
                                            imgElement.src = "assets/img/cropped-J-39.png";
                                            this.condition2 = false;
                                            world.character.condition3 = false;
                                        }, 100);
                                    }, 100);
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        } else {
            return;
        }
    }
    /**
     * This function triggers the dead sequence
     */
    playSequenceD() {
        if (!world.character) {
            console.error("world.character is undefined");
            return;
        }
        if (this.condition4 == false) {
            this.condition4 = true;
            const imgElement = new Image(); // Create a new image element
            imgElement.src = "assets/img/cropped-D-51.png";
            imgElement.style.transform = "scaleX(-1)";
            this.img = imgElement; // Assign the image element to character.img
            setTimeout(() =>{
                imgElement.src = "assets/img/cropped-D-52.png";
                setTimeout(() =>{
                    imgElement.src = "assets/img/cropped-D-53.png";
                    setTimeout(() =>{
                        imgElement.src = "assets/img/cropped-D-54.png";
                        setTimeout(() =>{
                            imgElement.src = "assets/img/cropped-D-55.png";
                            setTimeout(() =>{
                                imgElement.src = "assets/img/cropped-D-56.png";
                                setTimeout(() =>{
                                    imgElement.src = "assets/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png";
                                    setTimeout(function(){
                                        document.getElementById("frame").style.display = "block"
                                        document.getElementById("restart").style.display = "block"
                                        world.level.enemies.splice(0);
                                        deactivateKeyListeners()
                                    },100)
                                }, 100);   
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        } else {
            return;
        }
    }
}