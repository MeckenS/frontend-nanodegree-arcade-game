// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55; //55 puts bug in middle of block
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //set enemy in motion
  if(this.x < this.boundary) {
    //sets the speed of bugs
    this.x += this.speed * dt;
  }
  else {
    this.x = this.resetPos;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.winGame = false;
  }
  //Draw player on the gameboard
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //update player position
  handleInput(input)  {
    switch(input) {
      case 'left':
      if (this.x > 0) {
        this.x -= this.step;
      }
      break;
      case 'up':
      if (this.y > 83) {
        this.y -= this.jump;
      }
      break;
      case 'right':
      if (this.x < this.step * 4) {
        this.x += this.step;
      }
      break;
      case 'down':
      if (this.y < this.jump * 4) {
        this.y += this.jump;
      }
      break;
    }
  }

  update() {
    //player and bug collision
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
        this.reset();
      }
    }
    //checks to see if player won game
    if (this.y === 55) {
      this.winGame = true;
    }
  }
  //reset the player
  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }

}

//Create player & Bugs
const player = new Hero();
const bugOne = new Enemy(-101, 0, 250);
const bugTwo = new Enemy(-101, 83, 200);
const bugThree = new Enemy(-101, 166, 300);
const allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree);


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
