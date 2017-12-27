/*
* Makes PC AI move
*/
pcMove(CurrPlayer, BoardIn, BoardOut):-
  findall(XBoard-C-D, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), Boards),
  findall(XBoard-C-D, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), PossiblePlays),
	(
		 PossiblePlays \= []
	;
		 changePlayer(CurrPlayer, NewPlayer),
		 gamePrint(BoardIn), nl,
		 write(NewPlayer), write(' won!'),
		 abort
	),
  gamePrint(BoardIn),
  nl, write(CurrPlayer), write(' turn'), nl,
  countBarragoons(BoardIn, BarragoonsIn),
  countPieces(BoardIn, PiecesIn),
  choosePlay(PossiblePlays, _Line, _Column, CurrPlayer, PiecesIn, BarragoonsIn, _Board, NewBoard, MoveLine, MoveColumn),
  (
  var(NewBoard),
	random_permutation(Boards, [NewBoard-MoveLine-MoveColumn|_])
  ;
  true
  ),
  getPiece(BoardIn, MoveLine, MoveColumn, Piece),
  (
    gameOver(NewBoard, Loser),
    gamePrint(NewBoard), nl,
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
  ),
  get_code(_X).

  choosePlay([],MoveLine, MoveColumn, _CurrPlayer, _PiecesOut, _BarragoonsOut, BoardOut, BoardOut, MoveLine, MoveColumn).

  choosePlay([BoardIn-PlayLine-PlayColumn|Rest], MoveLine, MoveColumn, CurrPlayer, PiecesOut, BarragoonsOut, BoardOut, FinalBoard, LineOut, ColumnOut):-
    countPieces(BoardIn, Pieces),
    (
    Pieces @< PiecesOut,
    NewPiecesOut is Pieces,
    NewMoveLine is PlayLine,
    NewMoveColumn is PlayColumn,
    choosePlay(Rest, NewMoveLine, NewMoveColumn, CurrPlayer, NewPiecesOut, BarragoonsOut, BoardIn, FinalBoard, LineOut, ColumnOut)
    ;
    Pieces = PiecesOut,
    countBarragoons(BoardIn, Barragoons),
    Barragoons @< BarragoonsOut,
    NewBarragoonsOut is Barragoons,
    NewMoveLine is PlayLine,
    NewMoveColumn is PlayColumn,
    choosePlay(Rest, NewMoveLine, NewMoveColumn, CurrPlayer, PiecesOut, NewBarragoonsOut, BoardIn, FinalBoard, LineOut, ColumnOut)
    ;
    choosePlay(Rest, MoveLine, MoveColumn, CurrPlayer, PiecesOut, BarragoonsOut, BoardOut, FinalBoard, LineOut, ColumnOut)
    ).

/*
*  Counts barragoons in a single line
*/
countBarragoonLine([], 0).
countBarragoonLine([Head | Tail], N) :-
	(
		barragoon(Head) -> countBarragoonLine(Tail, NextN), N is NextN + 1
		;
		countBarragoonLine(Tail, N)
	).

/*
* Counts barragoons in board
*/
countBarragoons([] , 0).
countBarragoons([Head | Tail], NTotal):-
	countBarragoons(Tail, NextNTotal),
	countBarragoonLine(Head, N),
	NTotal is NextNTotal + N.

/*
* Counts number of pieces in a single line
*/
countPiecesLine([], 0).
countPiecesLine([Head | Tail], N) :-
(
	Head \= '  ' -> countPiecesLine(Tail, NextN), N is NextN + 1
	;
	countPiecesLine(Tail, N)
).

/*
* Counts number of pieces in board
*/
countPieces([] , 0).
countPieces([Head | Tail], NTotal):-
  countPieces(Tail, NextNTotal),
  countPiecesLine(Head, N),
  NTotal is NextNTotal + N.
