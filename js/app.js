// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Position

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Steps x and y
    this.stepX = 101;
    this.stepY = 83;
    // Position
    this.x = x;
    this.y = y + 55;
    // Speed
    this.speed = speed;
    // Image
    this.sprite = 'images/enemy-bug.png';
    // Offscreen X
    this.offscreen = this.stepX * 5;
    // Reset position
    this.resetPosition = -this.stepX;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // If enemies are offscreen
    if(this.x < this.offscreen) {
        // Increment the speed
        this.x += this.speed * dt;
    } else {
        // Reset the position
        this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor() {
        // Steps x and y
        this.stepX = 101;
        this.stepY = 83;
        // Position at start
        this.startX = this.stepX * 2;
        this.startY = (this.stepY * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        // Image
        this.sprite = 'images/char-boy.png';
        // End of the Game
        this.endOfGame = false;
    }

    // Compare the position of the enemies with the hero
    update() {
        for(let enemy of allEnemies) {

            if(this.y === enemy.y && (enemy.x + enemy.stepX/2 > this.x && enemy.x < this.x + this.stepX/2)) {
                console.log('Boom!');
                // If same position, reset the position of the hero
                this.reset();
            }
            
            // Check if the Hero y position is equal to 0 (the top of the grid)
            if(this.y === 55) {
                // End the game when the Hero is in the river
                this.endOfGame = true;
            }
        }
    }

    // Draw the hero image
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update the position of the hero when a key is pressed
    handleInput(input) {
        switch(input) {

            case 'left':
            if (this.x > 0) {
                this.x -= this.stepX;
            }
            break;

            case 'up':
            if (this.y > 0) {
                this.y -= this.stepY;
            }
            break;

            case 'right':
            if (this.x < this.stepX * 4) {
                this.x += this.stepX;
            }
            break;

            case 'down':
            if (this.y < this.stepY * 4) {
                this.y += this.stepY;
            }
            break;

        }
    }

    // Reset to the default position
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Player
const player = new Hero();

// Enemies
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 166, 300);

// Array containing the enemies
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
