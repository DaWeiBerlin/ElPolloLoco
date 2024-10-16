class Volume {
    constructor(world) {
        this.world = world; // Initialize the world object
    }

    /**
     * This function changes the volume
     */
    volume() {
        let vol = document.getElementById("vol").value / 100;

        // Update mute icon based on volume
        if (vol === 0) {
            document.getElementById("mute").src = "assets/volume-mute.png";
        } else if (vol <= 0.33) {
            document.getElementById("mute").src = "assets/low-volume.png";
        } else if (vol <= 0.66) {
            document.getElementById("mute").src = "assets/medium-volume.png";
        } else {
            document.getElementById("mute").src = "assets/volume-level.png";
        }

        // Adjust volume of a sound
        const adjustVolume = (sound, volumeMultiplier) => {
            if (sound) {
                sound.volume = vol * volumeMultiplier;
            }
        };

        // Ensure `this.world` is defined and has `throwableObjects`
        if (this.world && this.world.throwableObjects) {
            this.world.throwableObjects.forEach(bottle => {
                adjustVolume(bottle.sound_chicken, 0.25);
                adjustVolume(bottle.sound_chicken_small, 0.25);
                adjustVolume(bottle.sound_boss, 0.5);
            });
        }

        // Adjust volumes for other sounds
        if (this.world) {
            adjustVolume(this.world.sound_throw, 0.2);
            adjustVolume(this.world.sound_coin, 0.2);
            adjustVolume(this.world.sound_chicken, 0.2);
            adjustVolume(this.world.sound_chicken_small, 0.2);
            adjustVolume(this.world.sound_boss, 0.5);
            adjustVolume(this.world.sound_bottle, 0.5);
            adjustVolume(this.world.character.background_sound, 0.5);
            adjustVolume(this.world.character.walking_sound, 1);
        }
    }
}