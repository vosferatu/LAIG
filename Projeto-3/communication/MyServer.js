MyGameBoard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081;
  var request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = onSuccess.bind(this) || function(data){
                                            console.log("Request successful. Reply: " + data.target.response);
                                            return data.target.response;
                                          };
  request.onerror = onError || function(){console.log("Error waiting for response");};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
};

MyGameBoard.prototype.requestInitialBoard = function(){
  this.getPrologRequest('start_game', this.getBoard);
};

MyGameBoard.prototype.requestMove = function(){
  if(this.isEmpty(this.src))
      return;

  let srcIndex = Math.idToNum(this.src);
  let destIndex = Math.idToNum(this.dest);

  var playerAtom = Number(this.currentPlayer);
  var requestStr = 'move('+ playerAtom + ',' + this.prologBoard + ',' + srcIndex[0] + ',' +
                    srcIndex[1] + ',' + destIndex[0] + ',' + destIndex[1] + ')';
  console.log(requestStr);
  this.getPrologRequest(requestStr, this.getMove);
};

MyGameBoard.prototype.requestPCMove = function(){
  var playerAtom = Number(this.currentPlayer + 1);
  if(this.difficulty == 0 ){
    var requestStr = 'randomCPU(' + playerAtom + ',' + this.prologBoard + ')';
  } else {
    var requestStr = 'aiCPU(' + playerAtom + ',' + this.prologBoard + ')';
  }

  this.getPrologRequest(requestStr, this.getPCMove);
};

MyGameBoard.prototype.getPCMove = function(data){
  if(this.error(data) == 0) return;
  var move = eval(data.target.response);
  this.prologBoard = move[0];
  this.initialCell.x = move[1];
  this.initialCell.y = move[2];
  this.finalCell.x = move[3];
  this.finalCell.y = move[4];
  //send movement from here
  //this.makeMovement();
};

MyGameBoard.prototype.getBoard = function(data){
  if(this.error(data)) return;
  this.prologBoard = data.target.response;
};

MyGameBoard.prototype.getMove = function(data){
  if(this.error(data)) return;
  this.prologBoard = data.target.response;
  this.move();
};

MyGameBoard.prototype.requestGameOver = function(){
  if(this.error(data)) return;
  var playerAtom = Number(this.currentPlayer);
  var requestStr = '('+ playerAtom + ',' + this.prologBoard + ')';
  this.getPrologRequest(requestStr, this.getGameOver);
};

MyGameBoard.prototype.getGameOver = function(data){
  if(this.error(data)) return;
  var over = data.target.response; //loser is current player
  this.gameOver = (over == 1) ? 0 : 1;
};

MyGameBoard.prototype.requestEnd = function(){
  var requestStr = 'end(' + this.prologBoard + ')';
  this.getPrologRequest(requestStr, this.getEnd);
};

MyGameBoard.prototype.getEnd = function(data){
  if(this.error(data)) return;
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

MyGameBoard.prototype.requestPCBarragoon = function(){
  var playerAtom = Number(this.currentPlayer);
  var requestStr = 'barragoonRandom('+ this.prologBoard + ')';
  this.getPrologRequest(requestStr, this.getPCBarragoon);
};

MyGameBoard.prototype.getPCBarragoon = function(data){
  if(this.error(data)) return;
  var move = eval(data.target.response);
  this.prologBoard = move[0];
  this.bgCell.x = move[1];
  this.bgCell.y = move[2];
  this.bg = move[3];
  //send movement from here
  //this.bgMovement();
};

MyGameBoard.prototype.requestHumanBarragoon = function(){
  var playerAtom = Number(this.currentPlayer);
  //this.bg é a string que representa o barragoon
  var requestStr = 'setBarragoon(' + this.prologBoard + + ',' + this.bgCell.x + ',' + this.bgCell.y + ',' + this.bg + ')';
  this.getPrologRequest(requestStr, this.getBoard);
};

MyGameBoard.prototype.error = function(data){
  if (data.target.response == "Syntax Error" || data.target.response == "Bad Request"){
    return 1;
  }
}
