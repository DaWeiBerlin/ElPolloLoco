class StatusBarBoss extends DrawableObject{
    IMAGES = [
        "assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png"
    ]

    percentage = 100
    
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentageE(100);
    }

    /**
     * This function changes the img of the Ednboss Bar
     * @param {} percentage - This parameter changes when the Endboss will be hit by a bottle
     */
    setPercentageE(percentage){
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }

    /**
     * This function returns the index, which is used to decide which img will be used in the setPercentageE function
     * @returns 
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