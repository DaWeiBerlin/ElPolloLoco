class StatusBarBottles extends DrawableObject{
    IMAGES = [
        "assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png"
    ]

    percentage = 20
    
    
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentageB(20);
    }

    /**
     * This function changes the img of the Status bar
     * @param {*} percentage 
     */
    setPercentageB(percentage){
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }

    /**
     * This function changes the index, accordingly to the percentage value
     */
    resolveImageIndex(){
        if (this.percentage == 100){
            return 5;
        }else if (this.percentage >= 80){
            return 4;
        }else if (this.percentage >= 60){
            return 3;
        }else if (this.percentage >= 40){
            return 2
        }else if (this.percentage >= 20){
            return 1
        }else if (this.percentage == 0){
            return 0
        }
    }
}