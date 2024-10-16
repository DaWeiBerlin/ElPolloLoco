class ThrowableObject extends MovableObject {
    IMAGES_BOTTLES = [
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ]

    IMAGES_BROKEN_BOTTLE = [
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ]

    lifeCondi = true
    BottleHitCondi = false
    BottleSplashCondi = false
    chicken = false
    speed;
    damage = true

    sound_chicken = new Audio("assets/sounds/DeadChickenSoundEffect.mp3")
    sound_chicken_small = new Audio("chicken-noise-196746.mp3")
    sound_boss = new Audio("chicken-single-alarm-call-6056.mp3")

    constructor(x, y, endboss) {
        super();
        this.loadImage("assets/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = x - 40;
        this.y = y - 65;
        this.height = 60;
        this.width = 50;
        this.endboss = endboss; // Reference to the Endboss
        this.throwcondition = false;
        this.sound_chicken.volume = 0.25
        this.sound_chicken_small.volume = 0.25
        this.sound_boss.volume = 0.5
        this.throw(); // Initiate the throw action
        this.animate()
    }

    /**
     * This function animates the bottle when the character throws it
     */
    animate() {
        setInterval( () => {
            if(this.y < 360 && this.BottleSplashCondi == false){
                this.playAnimation(this.IMAGES_BOTTLES)
            }
            if(this.BottleHitCondi == true){
                this.speed = 0
                this.BottleSplashCondi = true
                this.playSequenceBH(this.IMAGES_BROKEN_BOTTLE)
            }
            
        }, 1000 / 60)
    }
    
    /**
     * This function changes the images of the bottle when it hits the gorund or an enemy
     * @param {*} images - this parameter contains the image array of the bottle
     * @returns 
     */
    playSequenceBH(images) {
        if (!world.character) {
            console.error("world.character is undefined");
            return;
        }
        if (this.condition4 == false) {
            this.condition4 = true;
            const imgElement = new Image(); // Create a new image element
            imgElement.src = images[0];
            imgElement.style.transform = "scaleX(-1)";
            this.img = imgElement; // Assign the image element to character.img
            setTimeout(() =>{
                this.x += 10
                imgElement.src = images[1];
                setTimeout(() =>{
                    this.x += 10
                    imgElement.src = images[2];
                    setTimeout(() =>{
                        this.x += 10
                        imgElement.src = images[3];
                        setTimeout(() =>{
                            this.x += 10
                            imgElement.src = images[4];
                            setTimeout(() =>{
                                this.x += 10
                                imgElement.src = images[5];
                                this.BottleSplashCondi = true
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
     * this function changes the parameters of the bottle, when the character throws it
     */
    throw() {
        this.speedY = 30; // Set initial speed
        this.applyGravity();
        this.x
        let time = 0
        let condi = true
        let damageind = 0
        if(world.character.otherDirection == false){
            this.speed = 10
        }

        if(world.character.otherDirection == true){
            this.speed = -10
        }

        let conditionB = true
        if(world.character.otherDirection == true){
            this.x -= 60
        }
        const intervalId = setInterval(() => {
            this.x += this.speed;
            world.level.enemies.forEach((enemy,index) => {

                if(this.isCollidingWithEnemy(enemy) && this.damage == true){
                    if(enemy instanceof Chicken){
                        damageind += 1
                    }
                    if(damageind == 2){
                        this.damage = false
                    }
                    // this.damage = false
                    if(enemy instanceof Endboss && condi == true){
                        condi = false
                        // world.endboss.condition4 = true
                        // world.endboss.condition5 = true

                        this.sound_boss.play()
                        this.damage = false
                        if (this.isCollidingWithEndboss(enemy)) {
                            condi = false
                            
                            this.handleCollision(index);
                        }
                        this.chicken = false
                    }else{
                        if(enemy instanceof Chicken){
                            this.sound_chicken.play()
                        }else{
                            this.sound_chicken_small.play()
                        }
                        this.chicken = true
                        // world.level.enemies.enemy.hit = true
                        enemy.hit = true
                        setTimeout(()=>{
                            world.level.enemies.splice(index, 1);
                        },500)
                    }
                    this.BottleHitCondi = true
            }})
            
            // Optional: Check if the object goes off-screen to stop throwing
            time += 25
            if(this.y > 480 - 120 && time >= 900 && world.character.otherDirection == false){
                this.conditionB = false
                this.speedY = 0
                this.speed = 0
                // this.y = 370
                if(this.throwcondition == false && this.BottleSplashCondi == false){
                    this.throwcondition = true
                    const imgElement = new Image();
                    imgElement.src = "assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
                    imgElement.style.transform = "scaleX(-1)";
                    this.img = imgElement; 
                }
            }
            if(this.y > 480 - 120 && time >= 900 && world.character.otherDirection == true && this.BottleSplashCondi == false){
                this.conditionB = false
                this.speedY = 0 
                this.speed = 0
                if(this.throwcondition == false){
                    this.throwcondition = true
                    const imgElement = new Image();
                    imgElement.src = "assets/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
                    imgElement.style.transform = "scaleX(-1)";
                    this.img = imgElement;
                }
            }
        }, 25);
    }

    /**
     * This Function checks if the bootle is colliding with an endboss
     * @param {*} endboss - This parameter defines the endboss
     * @returns 
     */
    isCollidingWithEndboss(endboss) {
        return this.x < endboss.x + endboss.width &&
               this.x + this.width > endboss.x &&
               this.y < endboss.y + endboss.height &&
               this.y + this.height > endboss.y;
    }

    /**
     * This function checks if this.bottle collides with an enemy 
     * @param {*} enemy - This parameter defines the enemy
     * @returns 
     */
    isCollidingWithEnemy(enemy) {
        return this.x < enemy.x + enemy.width &&
               this.x + this.width > enemy.x &&
               this.y < enemy.y + enemy.height &&
               this.y + this.height > enemy.y;
    }

    /**
     * This function changes parameters when bottle collides with an enemy
     * @param {*} index - not used
     */
    handleCollision(index) {
        if(this.lifeCondi == true){
            this.lifeCondi = false
            world.endboss.endbossLife -= 20;
            world.endboss.condition4 = true
            // world.endboss.condition5 = false


            world.statusBarBoss.setPercentageE(world.endboss.endbossLife);
            // if (world.endboss.endbossLife > 0) {
            //     world.endboss.playSequenceEH();
            // }
            // if (world.endboss.endbossLife <= 0) {
            //     world.endboss.playSequenceED(index);
            // }
            setInterval(() => {
                this.lifeCondi = true
            },3000)
        }
    }
}