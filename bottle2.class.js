class Bottle2 extends DrawableObject{
    IMAGES_BOTTLES = [
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ]

    IMAGES = [
        "assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ]
    constructor(x,y,img){
        super().loadImage(this.IMAGES[1])
        this.loadImages(this.IMAGES)
        this.loadImages(this.IMAGES_BOTTLES);
        // this.img = this.IMAGES[img]
        this.x = x;
        this.y = y
        this.width = 50
        this.height = 50
        // this.animate()
    }

    // animate(){
    //     setInterval(()=>{
    //         this.playAnimation(this.IMAGES_BOTTLES)
    //     }, 1000);
    // }
}