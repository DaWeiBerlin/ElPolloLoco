class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100
    lastHit = 0;

    constructor(){
        super()
    }

    /**
     * This function applys gravity to a Movable Object
     */
    applyGravity(){

        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY
                this.speedY -= this.acceleration 
            }else{
                if(world.keyboard.UP){
                    this.speedY = 25
                }
            }
        }, 1000/25)
    }

    /**
     * This function checks if a movable object is above the ground (y = 300)
     * @returns 
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true
        }else{
            return this.y <= 300;
        }
    }

    /**
     * This function checks if a MovableObject is colliding from above with another movable object
     * @param {*} mo - this defines the MovableObject
     * @returns 
     */
    isCollidingAbove(mo) {
        return  this.x + this.width > mo.x &&               // Right side of `this` is to the right of `mo`'s left side
                this.x < mo.x + mo.width &&                 // Left side of `this` is to the left of `mo`'s right side
                this.y + this.height <= mo.y &&             // Bottom of `this` is at or above the top of `mo`
                this.y + this.height >= mo.y - 5 &&         // Bottom of `this` is within a small tolerance (e.g., 5 pixels) above `mo`
                this.y < mo.y;                              // Top of `this` is above the top of `mo`
    }
    
    /**
     * This function checks if a MovableObject is colliding with another movable object
     * @param {*} mo -This defines the movable Object
     * @returns 
     */
    isColliding(mo) {
        return  this.x + this.width > mo.x &&              // Right side of `this` is to the right of `mo`'s left side
                this.x < mo.x + mo.width &&                // Left side of `this` is to the left of `mo`'s right side
                (
                    (this.y + this.height > mo.y &&    // Side collisions: `this`'s bottom is not too close to `mo`'s top
                     this.y < mo.y + mo.height + 50) ||     // Top of `this` is not too close to `mo`'s bottom
    
                    (this.y < mo.y + mo.height &&          // Bottom collisions: `this`'s top is below `mo`'s bottom
                     this.y + this.height > mo.y)          // `this`'s bottom is above `mo`'s top (vertical overlap)
                );
    }
    
    /**
     * This function checks if the energy is 0
     * @returns 
     */
    isDead(){
        return this.energy == 0;
    }
    /**
     * This function changes the energy when the character collides with an enemy
     */
    hit(){
        if(this.energy > 20){
            this.energy -= 20;
            this.lastHit = new Date().getTime();
        }else{
            this.energy = 0
        }
    }

    /**
     * This function changes the let timepassed value 
     * @returns
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * This function changes the x value of the MovableObject
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function changes the x value of the MovableObject
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * This function changes the SpeedY value of the MovableObject
     */
    jump() {
        this.speedY = 25;
    }
}