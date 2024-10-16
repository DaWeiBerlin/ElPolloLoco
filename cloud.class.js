class Cloud extends MovableObject{
    y = 20
    width = 500;
    height = 250;
    constructor(x){
        super().loadImage('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png')
        this.x = x
        this.animate();        
    }

    /**
     * this function animates the clouds
     */
    animate(){
        setInterval(() => {
            this.x -= 0.1;

        },10)
    }
}