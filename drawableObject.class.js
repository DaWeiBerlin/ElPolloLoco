class DrawableObject{
    x = 120;
    y = 0;
    img;
    imageCache = {};
    currentImage = 0
    height = 200;
    width = 100;
    condition = false
    condition2 = false
    condition4 = false

    IMAGES_LOST = ["assets/img_pollo_locco/img/9_intro_outro_screens/game_over/game over!.png"]
    	
    /**
     * This function creates a new img and changes the src
     * @param {*} path - This parameter is the url of the img
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function draws an image
     * @param {*} ctx - These parameters define the img
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
     * This function creates new images and changes their src and their style and afterwards these images will be added to the imageCache of the class 
     * @param {*} arr - This parameter contains the images array
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src =  path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    /**
     * This function changes the img every time its triggered and at the end it iterates currentImage
     * @param {*} images - This function contains the images
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function changes draws a Frame around the movableObject
     * @param {*} ctx - This parameter defines the movable Object
     */
    drawFrame(ctx){
        // if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Chicken2){
        //     ctx.beginPath();
        //     ctx.lineWidth = "1";
        //     ctx.strokeStyle = "blue";
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke(); 
        // }
    }
}