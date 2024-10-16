class Coin extends DrawableObject{
    IMAGES_COINS = [
        "assets/img_pollo_locco/img/8_coin/coin_1.png",
        "assets/img_pollo_locco/img/8_coin/coin_2.png",
    ]
    constructor(x,y){
        super().loadImage("assets/img_pollo_locco/img/8_coin/coin_1.png")
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y
        this.width = 100    
        this.height = 100
        this.animate()
    }

    /**
     * This function animates the coin
     */
    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES_COINS)
        }, 1000);
    }
}