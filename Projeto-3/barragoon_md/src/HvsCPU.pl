/*
* H vs CPU random playing
*/
playCPUvsHrandom(CurrPlayer, BoardIn, BoardOut):-
	findall(XBoard, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), PossiblePlays),
	(
		 PossiblePlays \= []
	;
		 changePlayer(CurrPlayer, NewPlayer),
		 gamePrint(BoardIn), nl,
		 write(NewPlayer), write(' won!'),
		 abort
	),
	nl, write(CurrPlayer), write(' turn'), nl, nl,
	nl, write('HERE1'), nl,
  findall(XBoard-C-D, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), Boards),
	nl, write('HERE2'), nl,
	random_permutation(Boards, [NewBoard-MoveLine-MoveColumn|_]),
	nl, write('HERE3'), nl,
  getPiece(BoardIn, MoveLine, MoveColumn, Piece),
  (
    gameOver(NewBoard, Loser),
    showResult(Loser),
    abort
  ;
    barragoon(Piece),
    putBarragoonRandom(NewBoard, Board1),
    copy_term(Board1, BoardOut)
  ;
    getColor(Piece, Color),
    Color \= ' ',
    changePlayer(CurrPlayer, NewPlayer),
    (
    CurrPlayer = 'W',
    putBarragoonRandom(NewBoard, Board1),
    write(CurrPlayer), write(' puts barragoon:'), nl,
    putBarragoon(Board1, Board2),
    copy_term(Board2, BoardOut)
    ;
    CurrPlayer = 'B',
    write(NewPlayer), write(' puts barragoon:'), nl,
    putBarragoon(NewBoard, Board1),
    putBarragoonRandom(Board1, Board2),
    copy_term(Board2, BoardOut)
    )
  ;
    copy_term(NewBoard, BoardOut)
  ).

/*
* Random CPU vs H game mode
*/
playRandomCPUvsH:-
  initialBoard(BoardIn),
  initialPlayer(PlayerIn),
  assert(board(BoardIn)),
  assert(player(PlayerIn)),
  repeat,
        retract(board(BoardCurr)),
        retract(player(PlayerCurr)),
        once(askPlay(PlayerCurr,BoardCurr, NewBoard)),
        once(changePlayer(PlayerCurr, NewPlayer)),
        once(playCPUvsHrandom(NewPlayer, NewBoard, BoardOut)),
        once(changePlayer(NewPlayer, PlayerCurr)),
        assert(player(PlayerCurr)),
        assert(board(BoardOut)),
        gameOver(BoardOut, Loser),
        showResult(Loser),
   !.

/*
* AI CPU vs H game mode
*/
playAICPUvsH:-
  initialBoard(BoardIn),
  initialPlayer(PlayerIn),
  assert(board(BoardIn)),
  assert(player(PlayerIn)),
  repeat,
        retract(board(BoardCurr)),
        retract(player(PlayerCurr)),
        once(askPlay(PlayerCurr,BoardCurr, NewBoard)),
        once(changePlayer(PlayerCurr, NewPlayer)),
        once(pcMove(NewPlayer, NewBoard, BoardOut)),
        once(changePlayer(NewPlayer, PlayerCurr)),
        assert(player(PlayerCurr)),
        assert(board(BoardOut)),
        gameOver(BoardOut, Loser),
        showResult(Loser),
   !.
