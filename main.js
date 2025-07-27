const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#4488aa',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let bullets;
let cursors;
let lastFired = 0;

function preload () {
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
}

function create () {
    player = this.physics.add.image(400, 300, 'player');
    player.setCollideWorldBounds(true);

    bullets = this.physics.add.group({
        classType: Phaser.Physics.Arcade.Image,
        maxSize: 10,
        runChildUpdate: true
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', () => {
        if (this.time.now > lastFired) {
            let bullet = bullets.get();
            if (bullet) {
                bullet.enableBody(true, player.x, player.y, true, true);
                bullet.setVelocityY(-300);
                lastFired = this.time.now + 200;
            }
        }
    });
}

function update () {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    }
}

const game = new Phaser.Game(config);
