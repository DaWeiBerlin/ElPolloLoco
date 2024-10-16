class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 3670;

    constructor(enemies, clouds, backgroundObjects, bottles, coins){
        this.enemies = enemies;
        this.clouds =  clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins ;
        this.newEnemy()
    }
    
    /**
     * This function adds periodically a new enemy
     */
    newEnemy(){
        let chickenInt = 1
        setInterval(()=>{
            if(chickenInt == 1){
                this.enemies.push(new Chicken(4200))
                chickenInt = 2
            }else{
                this.enemies.push(new Chicken2(4200))
                chickenInt = 1
            }
        },(Math.random()*10000 + 5000))  
    }
}