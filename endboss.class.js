class Endboss extends MovableObject{
    endbossLife;
    conditionE = false
    y = 80
    width = 300
    height = 370
    x = 3900
    TesT = 0 
    IMAGES_WALKINGE = [
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
    ]

    IMAGES_WALKINGE2 = [
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
    ]

    IMAGES_ATTACK = [
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
    ]

    IMAGES_DEAD = [
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png"
    ]

    IMAGES_HURT = [
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png"
    ]

    IMAGES_ATTACK = [
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
        "assets/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png"
    ]
    constructor(){
        super().loadImage("assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png")
        this.loadImages(this.IMAGES_WALKINGE);
        this.loadImages(this.IMAGES_WALKINGE2);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.repeatCondition = false
        this.test()
        // this.applyGravity()
    }

    speed = 5
    condition = false
    condition2 = true
    condition3 = true
    condition4 = false
    condition5 = true
    condition6 = true
    condition7 = true
    EndCondi = true
    runc = true
    runbackc = true
    testc= true
    spliceCondition = true
    speedY = 0;
    acceleration = 2.5;
    randomNumber;
    EndbossAnimation;
    flyStart = true

    /**
     * This function checks if an Endboss allready spawned
     */
    test(){
        if(this.condition2 == true){
            this.condition2 = false
            this.endbossLife = 100
            this.animate()

        }
    }

    /**
     * This functions checks if the Endboss is above y = 80
     * @returns 
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true
        }else{
            return this.y <= 80;
        }
    }

    /**
     * This function applys gravity to the Endboss
     */
    applyGravity(){
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY
                this.speedY -= this.acceleration 
            }
        }, 1000/25)
    }

    /**
     * This function animates the Endboss
     */
    animate(){
        setInterval(()=>{
            if(world){
                if((world.statusBarBoss.percentage == 80 && world.endboss.condition4 == true) || (world.statusBarBoss.percentage == 60 && world.endboss.condition4 == true) || (world.statusBarBoss.percentage == 40 && world.endboss.condition4 == true) || (world.statusBarBoss.percentage == 20 && world.endboss.condition4 == true)){
                    this.condition5 = false
                    world.endboss.condition4 = false
                    this.playSequenceEH(this.IMAGES_HURT)
                    this.condition3 = false
                }else if(this.condition5 == true){
                    if(world.statusBarBoss.percentage == 0){
                        this.condition = true
                        this.playSequenceED(this.IMAGES_DEAD)
                        this.condition3 = false
                    }else if( world.character.x > 3500 && this.condition3 == true || this.condition == true && this.condition3 == true){
                        world.level.enemies.forEach((enemy,index) => {
                            if(enemy instanceof Chicken || enemy instanceof Chicken2){
                                world.level.enemies.splice(index,1)
                            }
                        });
                        this.condition = true
                        this.x -= 20 + Math.random()*5
                        this.playAnimation(this.IMAGES_ATTACK)
                        if(this.flyStart == true){
                            this.flyStart = false
                            this.fly()
                        }
                    }
                    if(world.character.x < 3500 && this.condition == false){
                        this.playAnimation(this.IMAGES_WALKINGE)
                    }
                }
            }
        }, 100);
    }

    /**
     * This function lets the Endboss fly, becuase it changes the speedY value and triggers the applyGravity function
     */
    fly(){
        setInterval(()=>{
            const fly = setInterval(()=>{
                this.x -= 10
            },100)
            setTimeout(() => {
                clearInterval(fly)
            },2000)
            this.speedY = 40
            this.applyGravity()
        },4000)
    }
    
    // animate() {
    //     // let EndbossAnimation = setInterval(()=>{
    //         // // console.log(this.img)
    //         // console.log(this.condition4)

    //         // if(this.condition4 == true){
    //         //     clearInterval(EndbossAnimation)

    //         //     this.condition4 = false
    //         //     if ([80, 60, 40, 20].includes(world.statusBarBoss.percentage)){
    //         //         this.Hurt()
    //         //     }else{
    //         //         this.dead()
    //         //     }
    //         // }
    //         // if(world && this.condition5 == true && this.EndCondi == true){
    //         //     this.condition5 = false
    //         //     this.EndCondi = false
    //         //     if(world.character.x >= 3500){
    //         //         this.condition = true
    //         //     }
    //         //     console.log(this.condition4)
    //         //     if(this.condition4 == true){
    //         //         this.condition4 = false
    //         //         if ([80, 60, 40, 20].includes(world.statusBarBoss.percentage)){
    //         //             this.Hurt()
    //         //         }else{
    //         //             this.dead()
    //         //         }
    //         //     }else{
    //         //         if(this.condition4 == false){
    //         //             if(world.character.x < 400 && this.condition == false){
    //         //                 this.playAnimation(this.IMAGES_WALKINGE)
    //         //             }else{
    //         //                 this.playAnimation(this.IMAGES_WALKINGE2)
    //         //                 this.x -= 15
    //         //             }
    //         //             this.condition5 = true
    //         //         } 
    //         //     }
    //         //     this.EndCondi = true
    //         // } 
    //     // },100)
    //     const Test = setInterval(() => {
    //         if(this.testc == true){
    //             this.testc = false
    //     


    //             if (world && this.condition5 && this.condition7) {
    //                 this.condition7 = false;
    //                 if (this.condition6) {
    //                     this.handleBossStatus();
    //                     this.handleCharacterPosition();
    //                     this.walk();
    //                 }
    //                 this.condition7 = true;
    //             }
    //         this.testc = true
    //         }
            
    //     }, 100);
    // }
    
    // handleBossStatus() {    
    //     if (world.statusBarBoss.percentage === 0) {
    //         this.dead();
    //     } else if ([80, 60, 40, 20].includes(world.statusBarBoss.percentage) && this.condition4) {
    //         this.resetConditions();
    //         this.Hurt();
    //     }
    // }
    
    // handleCharacterPosition() {    
    //     if ((world.character.x > 3500 && this.condition3) || (this.condition && this.condition3)) {
    //         this.removeChickens();
    //         this.randomNumber = Math.random() * 12.5;

    //         this.AttackSequence1();
    //         this.AttackSequence2();
    //         this.condition = true;
    //     }
    // }
    
    // resetConditions() {
    //     this.condition4 = false;
    //     this.condition5 = false;
    //     this.condition6 = false;
    //     this.condition3 = false;
    // }
    

    // walk(){
    //     if(world.character.x < 3500 && this.condition == false){
    //         this.playAnimation(this.IMAGES_WALKINGE)
    //     }
    // }

    // removeChickens(){
    //     if(this.spliceCondition == true){
    //         this.spliceCondition = false
    //         world.level.enemies.forEach((enemy,index) => {
    //             if(enemy instanceof Chicken || enemy instanceof Chicken2){
    //                 world.level.enemies.splice(index,1)
    //             }
    //         })
    //     }
    // }

    // AttackSequence1(){
    //     if(this.randomNumber <= 6.24){
    //         this.speedY += 30
    //         this.applyGravity()
    //         const run = setInterval(()=>{
    //             if(this.runc == true){
    //                 this.runc = false
    //                 this.x -= 16
    //                 if((world.statusBarBoss.percentage == 0) || (world.statusBarBoss.percentage == 80 && this.condition4 == true) || (world.statusBarBoss.percentage == 60 && this.condition4 == true) || (world.statusBarBoss.percentage == 40 && this.condition4 == true) || (world.statusBarBoss.percentage == 20 && this.condition4 == true)){
    //                     if(world.statusBarBoss.percentage == 0){
    //                         this.condition = true
    //                         this.condition5 = false
    //                         this.playSequenceED(this.IMAGES_DEAD)
    //                         this.condition3 = false
    //                         clearInterval(run)
    //                     }else{
    //                         this.condition6 = false
    //                         this.condition5 = false
    //                         this.conditionE = false
    //                         this.condition4 = false
    //                         this.playSequenceEH(this.IMAGES_HURT)
    //                         clearInterval(run)
    //                     } 
    //                 }else if(this.condition6 == true){
    //                     this.playAnimation(this.IMAGES_ATTACK)
    //                 }
    //             this.runc = true 
    //             }
    //         },100)
    //         setTimeout(()=>{
    //             clearInterval(run)
    //             this.condition5 = true
    //         },5000)
    //         this.repeatCondition = false
    //     }
    // }

    // AttackSequence2(){
    //     if(this.randomNumber >= 11 && this.repeatCondition == false){
    //         this.repeatCondition = true
    //         this.otherDirection = true;                             
    //         const runback = setInterval(()=>{
    //             if(this.runbackc == true){
    //                 this.runbackc = false
    //                 this.x += this.speed
    //                 if((world.statusBarBoss.percentage == 0) || (world.statusBarBoss.percentage == 80 && this.condition4 == true) || (world.statusBarBoss.percentage == 60 && this.condition4 == true) || (world.statusBarBoss.percentage == 40 && this.condition4 == true) || (world.statusBarBoss.percentage == 20 && this.condition4 == true)){
    //                     if(world.statusBarBoss.percentage == 0){
    //                         this.condition = true
    //                         this.condition5 = false
    //                         this.playSequenceED(this.IMAGES_DEAD)
    //                         this.condition3 = false
    //                     }else{
    //                         this.condition6 = false
    //                         this.condition5 = false
    //                         this.conditionE = false
    //                         this.condition4 = false
    //                         this.condition = true
    //                         this.playSequenceEH(this.IMAGES_HURT)
    //                     } 
    //                 }else if(this.condition6 == true){
    //                     this.playAnimation(this.IMAGES_WALKINGE2)
    //                 }
    //             this.runbackc = true
    //             }
                
    //         },100)
    //         setTimeout(()=>{
    //             clearInterval(runback)
    //             this.otherDirection = false;                             
    //             this.condition5 = true
    //         },2000)
    //     }
    // }

    // Hurt(){
    //     this.condition4 = false
    //     this.condition = true
    //     this.conditionE = false
    //     this.playSequenceEH(this.IMAGES_HURT)
    // }

    // dead(){
    //     // this.condition = true
    //     this.playSequenceED(this.IMAGES_DEAD)
    //     // this.condition3 = false
    // }


    // playSequenceEH() {
    //     let images = [
    //         "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    //         "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    //         "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png"
    //     ]
    //     if (!this.condition4) return;
    
    //     this.condition4 = false; // Ensure this is only set to false once when starting the sequence
    
    //     const imgElement = new Image();
    //     imgElement.style.transform = "scaleX(-1)"; // Apply transformation if needed
    
    //     let index = 0;
    //     const updateImage = () => {
    //         if (index >= images.length) {
    //             clearInterval(animationInterval);
    //             this.condition5 = true; // Update condition after sequence ends
    //             return;
    //         }
    
    //         imgElement.src = images[index];
    //         this.img = imgElement; // Assuming `this.img` is used to display the image
    //         console.log(this.img)
    //         index++;
    //     };
    
    //     // Update the image immediately to start the animation
    //     updateImage();
    
    //     // Update the image at intervals
    //     const animationInterval = setInterval(updateImage, 200); // Adjust timing as needed
    // }

    /**
     * This function changes the img of the Endboss in a sequence - The Hurt Sequence
     */
    playSequenceEH() {
        if (this.conditionE == false) {
            this.conditionE = true;
            const imgElement = new Image();
            imgElement.src = "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png";
            imgElement.style.transform = "scaleX(-1)";
            this.img = imgElement;
            setTimeout(() => {
                imgElement.src = "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png";
                setTimeout(() => {
                    imgElement.src = "assets/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png";
                    setTimeout(() => {
                        this.condition5 = true
                        this.conditionE = false
                        this.condition6 = true
                        this.condition3 = true
                    },200)
                }, 200);
            }, 200);
        }
    }


    /**
     * This function changes the img of the Endboss in a sequence - The Dead Sequence
     */
    playSequenceED(index) {
        if (!world.endboss) {
            return;
        }
    
        if (this.conditionE == false) {
            this.conditionE = true;
            const imgElement = new Image();
            imgElement.src = "assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png";
            imgElement.style.transform = "scaleX(-1)";
            this.img = imgElement;
            setTimeout(() => {
                imgElement.src = "assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png";
                setTimeout(() => {
                    imgElement.src = "assets/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png";
                    setTimeout(() => {
                        document.getElementById("left").style.display = "none"
                        document.getElementById("right").style.display = "none"
                        document.getElementById("up").style.display = "none"
                        document.getElementById("space").style.display = "none"
                        document.getElementById("frame2").style.display = "block"
                        document.getElementById("frame").style.zIndex = "-1"
                        document.getElementById("restart").style.display = "block"
                        world.level.enemies.splice(index, 1);
                        world.level.enemies.splice(0);
                        deactivateKeyListeners()
                    }, 500);
                }, 500);
            }, 500);
        } else {
            return;
        }
    }
}