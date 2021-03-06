
//load world
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//set variables
var cursors;
var player;
var x;
var y;
var keySpace;
var tear;
var graphics;
var checkKey;
var keyA;
var keyW;
var keyD;
var keyS;
var counter = 45;
var playerSpeed = 250;
var enemyspeed = 50;
var counter2 = 0;
var state = 1;
var enemyHealth = 3;
var playerHealth = 5;
var heart = [];
var room1;
var room2;
var fly;
var flySpeed = 170;
var flyHealth = 2;


var game = new Phaser.Game(config);
//load assets
function preload ()
{
    this.load.image('isaac', 'assets/isaac.png');
    this.load.image('tear', 'assets/teardrop1.png');
    this.load.image('background', 'assets/room.png');
    this.load.image('room2', 'assets/room3.png');
    this.load.image('room3', 'assets/room2.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('blood', 'assets/blooddrop.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('fly', 'assets/fly.png');
}
//set starting states
function create ()
{
    //load sprites
    blood = this.physics.add.image(0, 0, 'blood');
    tear = this.physics.add.image(0, 0, 'tear');
    fly = this.physics.add.image(100, 100, 'fly');
    enemy = this.physics.add.image(100, 100, 'enemy');
    //load rooms
    room2 = this.add.image(config.width / 2, config.height / 2 ,'room2');
    room1 = this.add.image(config.width / 2, config.height / 2 ,'background');
    room3 = this.add.image(config.width / 2, config.height / 2 ,'room3');
    background = this.add.image(config.width / 2, config.height / 2 ,'background');
    background.scaleX = .6;
    background.scaleY = 0.8;
    x = 400;
    y = 400;
    //load in key use
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    
    //player display and sizing
    player = this.physics.add.image(x, y, 'isaac');
    
    // player.displayOriginX = (10);
    // player.displayOriginY = (1);

    // enemy.displayOriginX = (10);
    // enemy.displayOriginY = (1);

    player.setCollideWorldBounds(true);
    player.scaleX = 0.5;
    player.scaleY = 0.5;

    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // this.physics.add.collider(enemy, 'tear');
    //heart preload
    for(let i = playerHealth; i > 0; i --){
        heart[i] = this.add.image(20*i, 20, 'heart');
        heart[i].scaleX = 0.5;
        heart[i].scaleY = 0.5;
    }

    
}
//change motion
function update ()
{
    //move player
    if(state !== 2){
        counter2 ++;
        player.setVelocity(0);

        if (cursors.left.isDown)
        {
            player.setVelocityX(-playerSpeed);
            checkKey = "left";
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(playerSpeed);
            checkKey = "right";
        }

        if (cursors.up.isDown)
        {
            player.setVelocityY(-playerSpeed);
            checkKey = "up";
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(playerSpeed);
            checkKey = "down";
        }
        //tears shooter
        if (counter < 30 ){
            counter ++;
        }

        else{
            tear.disableBody(true,true);
            if(keyS.isDown){
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityY(500);
                this.physics.add.collider(tear, enemy, ouch);
            }
            else if(keyW.isDown){
                tear.disableBody(true, true);
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityY(-500);
                this.physics.add.collider(tear, enemy, ouch);
                }
            else if(keyA.isDown){
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityX(-500);
                this.physics.add.collider(tear, enemy, ouch);
                }
            else if(keyD.isDown){
                tear = this.physics.add.image(player.x, player.y, 'tear');
                tear.setVelocityX(500);
                this.physics.add.collider(tear, enemy, ouch);
                }
                counter = 0;
            }
            //state finder/ room finder
            if(player.x === 37 && player.y > 275 && player.y < 325 && state !== 3){
                player.x = 760;
                if(state === 1){
                    state = 3;
                    background = this.add.image(config.width / 2, config.height / 2 ,'room2');
                    enemy = this.physics.add.image(100, 100, 'enemy');
                    enemy.setCollideWorldBounds(true);
                    enemy.scaleX = 0.5;
                    enemy.scaleY = 0.5;
                    this.physics.add.collider(player, enemy);
                    background.scaleX = .6;
                    background.scaleY = 0.8;
                    player = this.physics.add.image(player.x, player.y, 'isaac');
                    player.setCollideWorldBounds(true);
                    player.scaleX = 0.5;
                    player.scaleY = 0.5;
                }
                else if(state === 4){
                    state = 1;
                    background = this.add.image(config.width / 2, config.height / 2 ,'background');;
                    background.scaleX = .6;
                    background.scaleY = 0.8;
                    player = this.physics.add.image(player.x, player.y, 'isaac');
                    player.setCollideWorldBounds(true);
                    player.scaleX = 0.5;
                    player.scaleY = 0.5;
                }
                for(let i = playerHealth; i > 0; i --){
                    heart[i] = this.add.image(20*i, 20, 'heart');
                    heart[i].scaleX = 0.5;
                    heart[i].scaleY = 0.5;
                }
            }
            if(player.x > 763 && player.y > 275 && player.y < 325 && state !== 4){
                player.x = 40;
                if(state === 3){
                    state = 1;
                    background = this.add.image(config.width / 2, config.height / 2 ,'background');
                    background.scaleX = .6;
                    background.scaleY = 0.8;
                    player = this.physics.add.image(player.x, player.y, 'isaac');
                    player.setCollideWorldBounds(true);
                    player.scaleX = 0.5;
                    player.scaleY = 0.5;
                }
                else if (state === 1){
                    state = 4;
                    background = this.add.image(config.width / 2, config.height / 2 ,'room3');
                    room3;
                    background.scaleX = .6;
                    background.scaleY = 0.8;
                    player = this.physics.add.image(player.x, player.y, 'isaac');
                    player.setCollideWorldBounds(true);
                    player.scaleX = 0.5;
                    player.scaleY = 0.5;
                    fly = this.physics.add.image(400, 100, 'fly');
                    fly.setCollideWorldBounds(true);
                    fly.scaleX = 0.2;
                    fly.scaleY = 0.2;
                    
                }
                for(let i = playerHealth; i > 0; i --){
                    heart[i] = this.add.image(20*i, 20, 'heart');
                    heart[i].scaleX = 0.5;
                    heart[i].scaleY = 0.5;
                }
            }
            if(state === 3){
            
                if(enemyHealth > 0){
        //enemy movement
                    if (player.x < enemy.x)
                    {
                        enemy.setVelocityX(-enemyspeed);
                        
                    }
                    else if (player.x > enemy.x)
                    {
                        enemy.setVelocityX(enemyspeed);
                       
                    }

                    if (player.y < enemy.y)
                    {
                        enemy.setVelocityY(-enemyspeed);
                        
                    }
                    else if (player.y > enemy.y)
                    {
                        enemy.setVelocityY(enemyspeed);
                     
                    }
                    //enemy fire
                    
                    if(counter2 % 45 === 0){
                        bloodRemover();
                    if(player.y < enemy.y && dist(enemy.x, player.x) < dist(enemy.y, player.y)){
                        blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                        blood.setVelocityY(-400);
                        this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                    }
                    if(player.x > enemy.x && dist(enemy.x, player.x) > dist(enemy.y, player.y)){
                        blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                        blood.setVelocityX(400);
                        this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                    }
                    if(player.x < enemy.x && dist(enemy.x, player.x) > dist(enemy.y, player.y)){
                        blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                        blood.setVelocityX(-400);
                        this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                    }
                    if(player.y > enemy.y && dist(enemy.x, player.x) < dist(enemy.y, player.y)){
                        blood = this.physics.add.image(enemy.x, enemy.y, 'blood');
                        blood.setVelocityY(400);
                        this.physics.add.collider(blood, player, gameover, bloodRemover, this);
                    }
                
                
                }
            }
        }
            //fly moving
            if(state === 4){
                
                    
                    this.physics.add.collider(tear, fly, ouch);
                    this.physics.add.collider(player, fly, gameover, null, this);
                    //fly move
                    if (player.x < fly.x)
                    {
                        fly.setVelocityX(-flySpeed);
                        
                    }
                    else if (player.x > fly.x)
                    {
                        fly.setVelocityX(flySpeed);
                       
                    }

                    if (player.y < fly.y)
                    {
                        fly.setVelocityY(-flySpeed);
                        
                    }
                    else if (player.y > fly.y)
                    {
                        fly.setVelocityY(flySpeed);
                     
                    }
            }
    }
    
}


//player health and gameover load
function gameover(){
    if (playerHealth > 0){
        
        playerHealth --;
        heart[playerHealth + 1].destroy();
        
    }
    if (playerHealth <= 0){
    state = 2;
    over = this.add.image(config.width / 2, config.height / 2 ,'background');
        over.scaleX = 100;
        over.scaleY = 100;
    
    text = this.add.text(config.width/6, config.height / 2, "You Lose", { font: "74px Times New Roman", fill: "#f00" } );
    }
}

//find distance between things
function dist(p1, p2){
    var ans = p1 - p2;
    if(ans < 0){
        ans = ans * -1;
        return ans;
    }
    else{
        return ans;
    }
}
//hurt enemies
function ouch(){
    tear.disableBody(true, true);
    if(state === 3){
        enemyHealth --;
        if(enemyHealth <= 0){
            enemy.disableBody(true, true);
        }
    }
    if(state === 4){
        flyHealth --;
        if(flyHealth <= 0){

            fly.disableBody(true, true);
        }
    }
}


function bloodRemover(){
    blood.disableBody(true, true); 
}
