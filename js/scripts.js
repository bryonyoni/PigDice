var PigDice = { player1: 0,player2: 0,currentScore: 0,activePlayer: 1,
  rollDice: function(){
    var roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
      this.currentScore = 0;
      this.switchPlayer();
    }
    else {
      this.currentScore += roll;
    }
    return roll;
  },
  switchPlayer: function(){
    if(this.activePlayer === 1){
      this.player1 += this.currentScore;
      this.activePlayer = 2;
    }else{
      this.player2 += this.currentScore;
      this.activePlayer = 1;
    }
  },
  hold: function(){
    this.switchPlayer();
    this.currentScore = 0;
  }
};

$(document).ready(function(){
  $(".button").click(function(){
    $("#game").fadeIn(1500)
    $("#instructions").fadeOut()
  });
  var game = Object.create(PigDice);
  var player1wins = 0;
  var player2wins = 0;
  var checkPlayer = function() {
    var player = game.activePlayer;
    if (player === 1) {
      $("#player2buttons").hide();
      $("#player1buttons").show();
    } else {
      $("#player1buttons").hide();
      $("#player2buttons").show();
    }
  };
  checkPlayer();

  var playerRoll = function() {
    var dice = game.rollDice();
    // var output = dice-1;
    //  $("#dice").text(dice);
     winCheck();
     refreshScoreBoard();
     checkPlayer();
  }

  $("button#roll").click(function(){
    playerRoll();
  });

  $("button#hold").click(function(){
    game.hold();
    winCheck();
    refreshScoreBoard();
    checkPlayer();
  });

  var winCheck = function(){
    if(game.player1 >= 100){
      $("#player1wins").text("player1 is the winner!!!!!!");
      game = Object.create(PigDice);
      $("#winner-meme").show();
      $("#win").hide();
      player1wins+=1;
      $("#player1wins").text(player1wins);
    } else if (game.player2 >= 100){
      $("#player2wins").text("player2 is the winner!!!!!!");
      $("#winner-meme2").show()
      game = Object.create(PigDice);
      player2wins+=1;
      $("#player2wins").text(player2wins);
    }
  };

  var refreshScoreBoard = function(){
    $("#player1score").text(game.player1);
    $("#player2score").text(game.player2);
    $("#current").text(game.currentScore);
  }

});
