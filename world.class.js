class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;  
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBoss = new StatusBarBoss();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    endboss = new Endboss(); // Ensure this is defined
    chicken = new Chicken();
    chicken2 = new Chicken2();


    throwableObjects = []
    fullscreen = false;
    bottles = 1
    coins = 0
    throwCondition = true
    colideCondiBottle = true
    colideCondiCoin = true
    colideCondiEnemy = true
    colideCondi = true
    walkcondi = false
    air = [
        new Air('assets/img_pollo_locco/img/5_background/layers/air.png', 0)
    ]

    sound_chicken = new Audio("assets/sounds/deadchicken2.mp3")
    sound_chicken_small = new Audio("assets/sounds/chicken-noise2.mp3")
    sound_boss = new Audio("chicken-single-alarm-call-6056.mp3")
    sound_coin = new Audio("assets/sounds/coin-recieved-230517.mp3")
    sound_bottle = new Audio("assets/sounds/bottle2.mp3")
    sound_throw = new Audio("assets/sounds/spin2.mp3")

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
        this.sound_throw.volume = 0.2
        this.sound_coin.volume = 0.25
        this.sound_chicken.volume = 0.25
        this.sound_chicken_small.volume = 0.25
        this.sound_boss.volume = 0.5
        this.sound_bottle.volume = 0.5
        this.sound_throw.currentTime = 0
        this.sound_coin.currentTime = 0
        this.sound_chicken.currentTime = 0
        this.sound_chicken_small.currentTime = 0
        this.sound_boss.currentTime = 0
        this.sound_bottle.currentTime = 0
        this.colideCondiEnemy2 = false

    }
       
    /**
     * This functions sets the world
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * This function draws all objects
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBoss);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function inserts multiple movable object into the addTpMap() function
     * @param {*} mo 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * This function adds a movable object
     * @param {*} mo 
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)
        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    }

    /**
     * This function flips the image of the MovableObject
     * @param {*} mo 
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function flips the image back of the MovableObject
     * @param {*} mo 
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore()
    }

    /**
     * this function triggers the checkCollisions()
            and checkThrowObjects() function periodicaly
     */
    run(){
        setInterval(() => {//
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000/60)
    }

    /**
     * This function checks if the character is colliding with an movable Object
     */
    checkCollisions(){
        this.level.enemies.forEach((enemy,index) => {
            if(enemy instanceof Chicken && this.colideCondi == true || enemy instanceof Chicken2 && this.colideCondi == true){
                if(this.character.isCollidingAbove(enemy)){
                    if(enemy instanceof Chicken){
                        this.sound_chicken.play()
                        setTimeout(()=>{
                            this.sound_chicken.pause()
                            this.sound_chicken.currentTime = 0
                        },1000)
                    }
                    if(enemy instanceof Chicken2){
                        this.sound_chicken_small.play()
                        setTimeout(()=>{
                            this.sound_chicken_small.pause()
                            this.sound_chicken_small.currentTime = 0
                        },1000)
                    }
                    if(enemy instanceof Endboss){
                        this.sound_boss.play()
                        setTimeout(()=>{
                            this.sound_boss.pause()
                            this.sound_boss.currentTime = 0
                        },1000)
                    }
                    this.colideCondi = false
                    this.colideCondiEnemy = false
                    setTimeout(()=>{
                        this.colideCondi = true
                        this.level.enemies.splice(index, 1);
                    },500)
                    this.character.speedY = 25
                    enemy.baseSpeed = 0
                    enemy.baseSpeed2 = 0

                    this.character.playSequenceJ()
                    enemy.hit = true
                    setTimeout(()=>{
                        this.colideCondiEnemy = true
                    },100)
                }else if(this.character.isColliding(enemy)&&this.colideCondiEnemy === true){
                    if(enemy instanceof Chicken){
                        this.sound_chicken.play()
                        setTimeout(()=>{
                            this.sound_chicken.pause()
                            this.sound_chicken.currentTime = 0
                        },1000)
                    }
                    if(enemy instanceof Chicken2){
                        this.sound_chicken_small.play()
                        setTimeout(()=>{
                            this.sound_chicken_small.pause()
                            this.sound_chicken_small.currentTime = 0
                        },1000)
                    }
                    if(enemy instanceof Endboss){
                        this.sound_boss.play()
                        setTimeout(()=>{
                            this.sound_boss.pause()
                            this.sound_boss.currentTime = 0
                        },1000)
                    }
                    this.colideCondi = false
                    this.colideCondiEnemy = false
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    enemy.hit = true
                    setTimeout(()=>{
                        this.colideCondiEnemy = true
                    },100)
                    setTimeout(()=>{
                        this.colideCondi = true
                        this.level.enemies.splice(index, 1);
                    },500)
                }
            }
            if(enemy instanceof Endboss){
                if(this.character.isColliding(enemy)&&this.colideCondiEnemy === true){
                    this.colideCondiEnemy = false
                    if(this.colideCondiEnemy2 == true){
                        this.colideCondiEnemy2 = false
                        this.character.hit();
                    }
                    
                    const Interval = setInterval(() => {//
                        this.character.moveLeft()
                        deactivateKeyListeners()
                        setTimeout(()=>{
                            this.character.otherDirection = true
                        },50)
                        if(world.character.x < 100 ){
                            clearInterval(Interval)
                            this.walkcondi = true
                            keylisteners()
                        }else{
                            setTimeout(()=>{
                                clearInterval(Interval)
                                keylisteners()
                            },3000)
                        }
                    }, 1000/60)
                    this.walkcondi = false
                    this.statusBar.setPercentage(this.character.energy);
                    setTimeout(()=>{
                        this.colideCondiEnemy = true
                    },100)
                    setTimeout(()=>{
                        this.colideCondiEnemy2 = true
                    },1000)
                } 
            }
        })
        this.level.coins.forEach((coin,index) => {
            if(this.character.isColliding(coin)&&this.colideCondiCoin === true && this.coins < 5){
                this.sound_coin.play()
                setTimeout(()=>{
                    this.sound_coin.pause()
                    this.sound_coin.currentTime = 0

                },500)
                this.level.coins.splice(index, 1);
                this.colideCondiCoin = false
                this.coins += 1 
                this.statusBarCoins.percentage = this.coins * 20
                this.statusBarCoins.setPercentageCoin(this.statusBarCoins.percentage);
                setTimeout(()=>{
                    this.colideCondiCoin = true
                },100)
            }
        })
        this.level.bottles.forEach((bottle,index) => {
            if(this.character.isColliding(bottle)&&this.colideCondiBottle === true){
                if(this.bottles < 5){
                    this.sound_bottle.play()
                    setTimeout(()=>{
                        this.sound_bottle.pause()
                        this.sound_bottle.currentTime = 0

                    },500)
                    this.level.bottles.splice(index, 1);
                    this.colideCondiBottle = false
                    this.bottles += 1
                    this.statusBarBottles.percentage = this.bottles * 20
                    this.statusBarBottles.setPercentageB(this.statusBarBottles.percentage);
                    setTimeout(()=>{
                        this.colideCondiBottle = true
                    },100)
                }
            }
        });
    }
    /**
     * This function checks if the user can throw a bottle
     */
    checkThrowObjects(){
        if(this.keyboard.SPACE && this.bottles > 0 && this.throwCondition == true){
            this.sound_throw.play()
            setTimeout(()=>{
                this.sound_throw.pause()
                this.sound_throw.currentTime = 0

            },1500)
            this.throwCondition = false
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100/*this.endboss*/)
            this.throwableObjects.push(bottle)
            this.bottles -= 1
            this.statusBarBottles.percentage = this.bottles * 20
            this.statusBarBottles.setPercentageB(this.statusBarBottles.percentage);
            setTimeout(()=>{
                this.throwCondition = true
            },1000)
        }
    }
}