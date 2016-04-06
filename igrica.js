var game = new Phaser.Game(1350, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.spritesheet('zmajo_red', 'assets/zmajo_red.png',51,34);
    game.load.spritesheet('zmajo_cold', 'assets/zmajo_cold.png',51,34);
    game.load.image('bullet', 'assets/fireball.png');
    game.load.image('coldball', 'assets/coldball.png');
    game.load.image('background_scaled', 'assets/background_scaled.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('ground1', 'assets/platform222.png');
    game.load.image('kocka', 'assets/kocka_mala.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('kockica', 'assets/kocka_mala_skroz.png');

    game.load.audio('PVP', 'assets/PVP.mp3');
    game.load.audio('boom','assets/bullet.mp3');

    game.load.image('pet','assets/hp/5.png');
    game.load.image('cetiri','assets/hp/4.png');
    game.load.image('tri','assets/hp/3.png');
    game.load.image('dva','assets/hp/2.png');
    game.load.image('jedan','assets/hp/1.png');
    game.load.image('pet2','assets/hp2/5.png');
    game.load.image('cetiri2','assets/hp2/4.png');
    game.load.image('tri2','assets/hp2/3.png');
    game.load.image('dva2','assets/hp2/2.png');
    game.load.image('jedan2','assets/hp2/1.png');

    
}

var sprite;
var bullets;
var coldball;
var fireRate = 500;
var nextFire = 0;

var fireRate2 = 500;
var nextFire2 = 0;

var ledge_kretanja;
var ledge_kretnja2;
var ledge_kretnja3;

var music;
var boom;

var hpFire;
var hpCold;

var pobjedaFire=0;
var pobjedaCold=0;

var pet;
var pauza;
var labela1 = false;
var labela2 = false;

function create() {

    pauza=true;
    hpFire=5;
    hpCold=5;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background_scaled');
    music = game.add.audio('PVP');
    boom = game.add.audio('boom');
    music.play();
    music.volume = 1;
    platforms = game.add.group();
    platforms.enableBody = true;


    var ground = platforms.create(0, game.world.height - 64, 'ground1');
    ground.body.immovable = true;



    ledge_kretnja = platforms.create(400, 400, 'ground');

    ledge_kretnja.body.immovable = true;



    ledge_kretnja3 = platforms.create(150, 180, 'ground');

    ledge_kretnja3.body.immovable = true;


    var ledge = platforms.create(-100, 100, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(1100, 150, 'ground');

    ledge.body.immovable = true;



    ledge_kretnja2 = platforms.create(875, 300, 'ground');

    ledge_kretnja2.body.immovable = true;

    var kocka = platforms.create(1220,420,'kocka');

    kocka.scale.setTo(0.5, 0.5);

    kocka.body.immovable = true;

    kocka = platforms.create(0,420,'kocka');

    kocka.scale.setTo(0.5, 0.5);

    kocka.body.immovable = true;




    var kockica = platforms.create(190,490,'kockica');

    kockica.body.immovable = true;
    
    kockica = platforms.create(380,490,'kockica');

    kockica.body.immovable = true;

    kockica = platforms.create(590,490,'kockica');

    kockica.body.immovable = true;

    kockica = platforms.create(760,490,'kockica');

    kockica.body.immovable = true;

    kockica = platforms.create(905,490,'kockica');

    kockica.body.immovable = true;

    kockica = platforms.create(1100,490,'kockica');

    kockica.body.immovable = true;

    kockica = platforms.create(1220,100,'kockica');

    kockica.body.immovable = true;

    kockica = platforms.create(90,50,'kockica');

    kockica.body.immovable = true;








    game.physics.startSystem(Phaser.Physics.ARCADE);

 //   game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);


    coldball = game.add.group();
    coldball.enableBody = true;
    coldball.physicsBodyType = Phaser.Physics.ARCADE;
    coldball.createMultiple(50, 'coldball');
    coldball.setAll('checkWorldBounds', true);
    coldball.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(50, 400, 'zmajo_red');
    sprite2 = game.add.sprite(1250, 400, 'zmajo_cold');
    sprite.anchor.set(0.5);
    sprite2.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.enable(sprite2, Phaser.Physics.ARCADE);

    sprite.body.gravity.y = 350;
    sprite.body.collideWorldBounds = true;
    sprite.animations.add('right', [0, 1, 2, 3], 10, true);
    sprite.animations.add('left', [4, 5, 6, 7], 10, true);
    sprite.animations.add('flying_right',[2],10,true);
    sprite.animations.add('flying_left',[5],10,true);

    sprite2.body.gravity.y = 350;

    sprite2.body.collideWorldBounds = true;
    sprite2.animations.add('right2', [0, 1, 2, 3], 10, true);
    sprite2.animations.add('left2', [4, 5, 6, 7], 10, true);
    sprite2.animations.add('flying_right2',[2],10,true);
    sprite2.animations.add('flying_left2',[5],10,true);

    pet = game.add.sprite(172, 10, 'pet');
    cetiri = game.add.image(136, 10, 'cetiri');
    tri =    game.add.image(100, 10, 'tri');
    dva =    game.add.image(65, 10, 'dva');
    jedan =   game.add.image(30, 9, 'jedan');


    pet2 = game.add.sprite(174+1100, 11, 'jedan2');
    cetiri2 = game.add.image(139+1100, 10, 'dva2');
    tri2 =    game.add.image(104+1100, 10, 'tri2');
    dva2 =    game.add.image(68+1100, 10, 'cetiri2');
    jedan2 =   game.add.image(32+1100, 10, 'pet2');
    
    cursors = game.input.keyboard.createCursorKeys(); 
   

}
var strana = 0;
var strana2 = 1;
function update() {
    game.physics.arcade.collide(sprite, platforms);
    game.physics.arcade.collide(sprite2, platforms);
    game.physics.arcade.collide(bullets,platforms,kolizija,null,this);
    game.physics.arcade.collide(coldball,platforms,kolizija,null,this);
    game.physics.arcade.collide(bullets,sprite2,kolizija2,null,this);
    game.physics.arcade.collide(coldball,sprite,kolizija3,null,this);

  

    if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
         if (strana2 == 1) {
            fire3();
        }
        else{
            fire4();
        }

    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
         if (strana == 0) {
            fire1();
        }
        else{
            fire2();
        }

    }


    sprite.body.velocity.x = 0;
    sprite2.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
       
        strana = 1;
        sprite.body.velocity.x = -150;
        if (sprite.body.touching.down) {
            sprite.animations.play('left');
        }
        else{
            sprite.animations.play('flying_left');

        }
        
        
    }
    else if (cursors.right.isDown){
        strana = 0;
        sprite.body.velocity.x = 150;
        if (sprite.body.touching.down) {
            sprite.animations.play('right');
        }
        else{
            sprite.animations.play('flying_right');
        }
    }
    else{
        sprite.animations.stop();
        if(strana == 0){
            sprite.frame = 0;
        }
        else{
            sprite.frame = 4;
        }
    }



//sprite 2 momving
if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        //  Move to the left
        strana2 = 1;
        sprite2.body.velocity.x = -150;
        if (sprite2.body.touching.down) {
            sprite2.animations.play('left2');
        }
        else{
            sprite2.animations.play('flying_left2');

        }
        
        
    }

    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
        strana2 = 0;
        sprite2.body.velocity.x = 150;

        if (sprite2.body.touching.down) {
            sprite2.animations.play('right2');
        }
        else{
            sprite2.animations.play('flying_right2');
        }
        
    }

    else
    {


        //  Stand still
        sprite2.animations.stop();
        if(strana2 == 0){
            sprite2.frame = 0;
        }
        else{
            sprite2.frame = 4;
        }
        
    }







    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && sprite.body.touching.down)
    {
        sprite.body.velocity.y = -350;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W) && sprite2.body.touching.down)
    {
        sprite2.body.velocity.y = -350;
    }



    if(ledge_kretnja.body.x<=400){
    ledge_kretnja.body.velocity.x = 41;
    
    }
    else if(ledge_kretnja.body.x>=500){
    ledge_kretnja.body.velocity.x = -43;
    }

    if(ledge_kretnja2.body.x>=875 ){
    ledge_kretnja2.body.velocity.x = -40;
    
    }
    else if(ledge_kretnja2.body.x<=300){
    ledge_kretnja2.body.velocity.x = 50;
    }


    if(ledge_kretnja3.body.x<=150 ){
    ledge_kretnja3.body.velocity.x = 35;
    
    }
    else if(ledge_kretnja3.body.x>=600){
    ledge_kretnja3.body.velocity.x = -45;
    }


    

}


    

function kolizija(bullet, platform){
        bullet.kill();
        boom.play();
       
}
function kolizija2(sprite, bullet){
        bullet.kill();
        boom.play();
        hpCold--;
        if (hpCold ==4) {
            jedan2.kill();
        }
        else if (hpCold == 3) {
            dva2.kill();
        }
        else if (hpCold == 2) {
            tri2.kill();
        }
        else if (hpCold == 1) {
            cetiri2.kill();
        }
        else if(hpCold<=0){
            pet2.kill();
            pobjedaFire++;
            music.stop();
            if(pobjedaFire==3){
                labela2 = true;
                render();
                
                game.paused = true;

            }
            hpFire=5;
            hpCold = 5;
            game.state.restart();
        }
}
function kolizija3(sprite, bullet){
        bullet.kill();
        boom.play();
        hpFire--;
        if (hpFire ==4) {
            pet.kill();
        }
        else if (hpFire == 3) {
            cetiri.kill();
        }
        else if (hpFire == 2) {
            tri.kill();
        }
        else if (hpFire == 1) {
            dva.kill();
        }
        //game.debug.text('Pobjednik je igrac 2' , 400, 200);
        else if(hpFire<=0){
            jedan.kill();
            pobjedaCold++;
            music.stop();
            
            if(pobjedaCold==3){
                label1 = true;
                render();
                game.paused = true;
                //game.debug.text(400, 100, 'Pobjednik je igrač 2', { font: '24px Arial', fill: '#fff' });
            }
            hpFire=5;
            hpCold = 5;
            game.state.restart();
        }
       
}
function fire1() {
    if (game.time.now > nextFire && bullets.countDead() > 0){
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(sprite.x+5, sprite.y - 8);
        bullet.body.velocity.x = 500;
    }
}
function fire2() {
    if (game.time.now > nextFire && bullets.countDead() > 0){
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(sprite.x - 20, sprite.y - 8);
        bullet.body.velocity.x = -500;
    }

}

function fire3() {

    if (game.time.now > nextFire2 && coldball.countDead() > 0)
    {
        nextFire2 = game.time.now + fireRate2;

        var cold = coldball.getFirstDead();

        cold.reset(sprite2.x-20, sprite2.y - 8);
        cold.body.velocity.x = -500;
        //game.physics.arcade.Move(bullet,300);
        //game.physics.arcade.moveToPointer(bullet, 300);
    }

}
function fire4() {

    if (game.time.now > nextFire2 && coldball.countDead() > 0)
    {
        nextFire2 = game.time.now + fireRate2;

        var cold = coldball.getFirstDead();

        cold.reset(sprite2.x+5, sprite2.y - 8);
        cold.body.velocity.x = 500;
        //game.physics.arcade.Move(bullet,300);
        //game.physics.arcade.moveToPointer(bullet, 300);
    }

}


function render() {
    game.debug.text('Health Fire: ' + hpFire, 32, 32);
    game.debug.text('Health Cold: ' + hpCold, 1150, 32);

    game.debug.text('Rezultat ' + pobjedaFire + ' : ' +  pobjedaCold , 550, 32);
    if (labela1) {game.debug.text('Pobjednik je igrac 2' , 550, 150,{ font: '24px Arial', fill: '#fff' });}
    else if(labela2){
        game.debug.text('Pobjednik je igrac 1' , 550, 150,{ font: '24px Arial', fill: '#fff' });
    }
    
}