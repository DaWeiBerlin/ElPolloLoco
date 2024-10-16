class Chicken2 extends MovableObject{
    IMAGES_WALKING = [
        "assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ]
    constructor(x){
        super().loadImage("assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png")
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

    // eat(){

    // }

    /**
     * This function animates the small chicken
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
                imgElement.src = "assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png";
                imgElement.style.transform = "scaleX(-1)";
                this.img = imgElement;
            }
        }, 100);
        // setInterval( () => {
        //     this.moveLeftChicken()
        // },1000 / 60)
    }

    // moveLeftChicken(){
    //     this.x -= this.speed
    // }
}