/*
* H vs H game mode
*/
playHvsH:-
  initialBoard(BoardIn),
  initialPlayer(PlayerIn),
  assert(board(BoardIn)),
  assert(player(PlayerIn)),
  repeat,
    retract(board(BoardCurr)),
    retract(player(PlayerCurr)),
    once(askPlay(PlayerCurr,BoardCurr, BoardOut)),
    once(changePlayer(PlayerCurr, NewPlayer)),
    assert(player(NewPlayer)),
    assert(board(BoardOut)),
    gameOver(BoardOut, Loser),
    showResult(Loser),
  !.
