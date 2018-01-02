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
  var playerAtom = Number(this.currentPlayer);
  if(this.difficulty){
    var requestStr = 'aiCPU(' + playerAtom + ',' + this.prologBoard + ')';
  } else {
    var requestStr = 'randomCPU(' + playerAtom + ',' + this.prologBoard + ')';
  }

  this.getPrologRequest(requestStr, this.getPCMove);
};

MyGameBoard.prototype.getPCMove = function(data){
  if(this.error(data) == 0) return;
  var move = data.target.response.split("-");

  this.prologBoard = move[0];
  this.src = Math.indexToNum(Number(move[1]), Number(move[2]));
  this.dest = Math.indexToNum(Number(move[3]), Number(move[4]));

  console.log(this.prologBoard);
  console.log(this.src);
  console.log(this.dest);

  this.move();
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
  var playerAtom = Number(this.currentPlayer);
  var requestStr = 'gameOver('+ playerAtom + ',' + this.prologBoard + ')';
  this.getPrologRequest(requestStr, this.getGameOver);
};

MyGameBoard.prototype.getGameOver = function(data){
  if(this.error(data)) return;
  var over = Number(data.target.response); //loser is current player

  this.gameOver = (over == 0) ? true : false;
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
      default:
          this.gameOver = false;
      return;
  }
  this.gameOver = true;
};

MyGameBoard.prototype.requestPCBarragoon = function(){
  var playerAtom = Number(this.currentPlayer);
  var requestStr = 'barragoonRandom('+ this.prologBoard + ')';
  this.getPrologRequest(requestStr, this.getPCBarragoon);
};

MyGameBoard.prototype.getPCBarragoon = function(data){
  if(this.error(data)) return;
  var move = data.target.response.split("-");

  this.prologBoard = move[0];
  this.bgIndex = Math.indexToNum(Number(move[1]), Number(move[2]));
  this.bg = move[3];

  //movement function
};

MyGameBoard.prototype.requestBarragoon = function(){
  //this.bg é a string que representa o barragoon
  let dest = Math.idToNum(this.bgIndex);
  var requestStr = 'barragoonH(' + this.prologBoard + ',' + dest[0] + ',' + dest[1] + ',' + this.bg + ')';
  this.getPrologRequest(requestStr, this.getBarragoon);
};

MyGameBoard.prototype.getBarragoon = function(data){
  if(this.error(data)) return;
  this.prologBoard = data.target.response;
  console.log("HERE");
  console.log(this.prologBoard);

  //movement function
};

MyGameBoard.prototype.error = function(data){
  if (data.target.response == "Syntax Error" || data.target.response == "Bad Request"){
    return 1;
  }
}
