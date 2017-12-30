MyGameboard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081;
  var request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = onSuccess.bind(this) || function(data){console.log("Request successful. Reply: " + data.target.response); return data.target.response;};
  request.onerror = onError || function(){console.log("Error waiting for response");};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
};

MyGameboard.prototype.requestInitialBoard = function(){
  this.getPrologRequest('start_game', this.getBoard);
};

MyGameboard.prototype.requestMovement = function(){
  var playerAtom = Number(this.currentPlayer);
  var requestStr = 'move('+ playerAtom + ',' + this.prologBoard + ',' + this.initialCell.x + ',' + this.initialCell.y + ',' + this.finalCell.x + ',' + this.finalCell.y + ')';
  this.getPrologRequest(requestStr, this.getBoard);
};

MyGameboard.prototype.requestPCMovement = function(){
  var playerAtom = Number(this.currentPlayer + 1);
  if(this.difficulty == 0 ){
    var requestStr = 'randomCPU(' + playerAtom + ',' + this.prologBoard + ')';
  } else {
    var requestStr = 'aiCPU(' + playerAtom + ',' + this.prologBoard + ')';  
  }

  this.getPrologRequest(requestStr, this.getPCMovement);
};

MyGameboard.prototype.getPCMovement = function(data){
  var move = eval(data.target.response);
  this.prologBoard = move[0];
  this.initialCell.x = move[1];
  this.initialCell.y = move[2];
  this.finalCell.x = move[3];
  this.finalCell.y = move[4];
  //send movement from here
  //this.makeMovement();
};

MyGameboard.prototype.getBoard = function(data){
  this.prologBoard = data.target.response;
};

MyGameboard.prototype.requestGameOver = function(){
    var playerAtom = Number(this.currentPlayer);
    var requestStr = '('+ playerAtom + ',' + this.prologBoard + ')';
    this.getPrologRequest(requestStr, this.getGameOver);
};

MyGameboard.prototype.getGameOver = function(data){
    var over = data.target.response; //loser is current player
    this.gameOver = (over == 1) ? 0 : 1;
};

MyGameboard.prototype.requestEnd = function(){
    var requestStr = '(' + this.prologBoard + ')';
    this.getPrologRequest(requestStr, this.getEnd);
};

MyGameboard.prototype.getEnd = function(data){
    var over = data.target.response;
    
    switch(over) { //ascii numbers
        case 98:
            this.winner = 2; //black
        break;
        case 119:
            this.winner = 1; //white
        break;
        case 0:
            this.winner = -1; //tie
        break;
        default:
            this.gameOver = 0;
        return;
    }
    this.gameOver = 1;
};

MyGameboard.prototype.requestPCBarragoon = function(){
    var playerAtom = Number(this.currentPlayer);
    var requestStr = 'barragoonRandom('+ this.prologBoard + ')';
    this.getPrologRequest(requestStr, this.getPCBarragoon);
  };

MyGameboard.prototype.getPCBarragoon = function(data){
    var move = eval(data.target.response);
    this.prologBoard = move[0];
    this.bgCell.x = move[1];
    this.bgCell.y = move[2];
    //send movement from here
    //this.bgMovement();
};

MyGameboard.prototype.requestPCBarragoon = function(){
    var playerAtom = Number(this.currentPlayer);
    //this.bg é a string que representa o barragoon
    var requestStr = 'setBarragoon(' + this.prologBoard + + ',' + this.bgCell.x + ',' + this.bgCell.y + ',' + this.bg + ')';
    this.getPrologRequest(requestStr, this.getPCBarragoon);
  };

MyGameboard.prototype.getPCBarragoon = function(data){
    this.prologBoard = data.target.response;
};