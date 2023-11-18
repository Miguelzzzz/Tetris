const players = document.querySelectorAll('.player');
const games = [];

[...players].forEach(element => {
	const tetris = new Tetris(element);
	games.push(tetris);
});

var keys=[];

document.body.addEventListener("keydown", function (event) {
	keys[event.keyCode] = event;
});

document.body.addEventListener("keyup", function (event) {
	keys[event.keyCode] = false;
});

let keyPressed = function(event) {
	const player1 = games[0].player;
	const player2 = games[1].player;

	//A
	if(keys[65]) player1.moveLeft();
		
	//D
	if(keys[68]) player1.moveRight();

	//S
	if(keys[83]) player1.drop();

	//W
	if(keys[87] && !keys[87].repeat) {
        player1.rotateClockWise();
        keys[87] = false;
    }

	//Q
	if(keys[81] && !keys[81].repeat) {
        player1.rotateAntiClockWise();
        keys[81] = false;
    }

	//left
	if(keys[37]) player2.moveLeft();

	//right
	if(keys[39]) player2.moveRight();

	//down
	if(keys[40]) player2.drop();

	//up
	if(keys[38] && !keys[38].repeat) {
        player2.rotateClockWise();
        keys[38] = false;
    }

	//left shift
	if(keys[16] && !keys[16].repeat) {
        player2.rotateAntiClockWise();
        keys[16] = false;
    }
};

setInterval(keyPressed, 80);

function pauseGame(){
  if(pause === true){   
    pause = false;  
    $('#pause').modal({"onCloseStart": update() });
    $('#pause').modal('close');
  } else {
    if(collide(arena, player)){
      pause = true;
      if(player.score > 0){
      $('#gameOver').modal({
                'dismissible': false,
                "onOpenEnd": function(){ $('#name').focus(); } 
      });
      $('#gameOver').modal('open');
      $('.yourScore').html(`<p>Your Score: ${player.score}`)
    } else {
      $('#newGame').modal({'dismissible': false});
      $('#newGame').modal('open'); 
    }
    } else {
      pause = true;
      document.createEventListener
    $('#pause').modal({
      "dismissible": false,
      "onCloseStart": update() });
    $('#pause').modal('open'); 
    $("#pauseBtn").focus(); 
    $('body').on('keydown', (e)=>{
      if(e.keyCode === 39){
        $('#StartNewBtn').focus();
      }
      if(e.keyCode === 37){
        $("#pauseBtn").focus(); 
      }
    })
    }
  }
}