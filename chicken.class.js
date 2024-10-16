class Chicken extends MovableObject{
    IMAGES_WALKING = [
        "assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ]
    constructor(x,y,img){
        super().loadImage("assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png")
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.y = 370
        this.width = 50
        this.height = 50
        this.animate()
    }
    baseSpeed = 3
    baseSpeed2 = 5 
    hit = false
    acceleration = 1

    eat(){

    }

    /**
     * This function animates the chicken
     */
    animate(){
        setInterval(()=>{
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.x -= this.baseSpeed //+ Math.random()*this.baseSpeed2
            if(this.hit == true){
                const imgElement = new Image();
                imgElement.src = "assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
                imgElement.style.transform = "scaleX(-1)";
                this.img = imgElement;
                
            }
        }, 100);

        setInterval( () => {
            this.moveLeftChicken()
        },1000 / 60)
        
        this.jump()
        
        
        
    }
    // jump(){
    //     const jump= setInterval(()=>{
    //         this.acceleration = 2
    //         this.speedY = 15
    //         this.applyGravityC()
    //     },10000)
    // }

    applyGravityC(){
        setInterval(() =>{
            if(this.isAboveGroundC() || this.speedY > 0){
                this.y -= this.speedY
                this.speedY -= this.acceleration 
            }
        }, 1000/25)
    }

    isAboveGroundC(){
        return this.y <= 360;
    }

    /**
     * This function changes the x value of the chicken
     */
    moveLeftChicken(){
        this.x -= this.speed
    }

    /**
     * This function returns the condition hit == true
     */
    ChickenisDead(){
        return this.hit == true
    }
}