makeAIplay(PlayerNo, BoardIn, NewBoard-PieceLine-PieceColumn-MoveLine-MoveColumn) :-
  getPlayerChar(PlayerNo, CurrPlayer),
  findall(XBoard-A-B-C-D, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), Boards),
  findall(XBoard-A-B-C-D, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), PossiblePlays),
  countBarragoons(BoardIn, BarragoonsIn),
  countPieces(BoardIn, PiecesIn),
  choosePlay(PossiblePlays, _OrLine, _OrColumn, _Line, _Column, CurrPlayer, PiecesIn, BarragoonsIn, _Board, NewBoard, PieceLine, PieceColumn, MoveLine, MoveColumn),
  (
    var(NewBoard),
    random_permutation(Boards, [NewBoard-PieceLine-PieceColumn-MoveLine-MoveColumn|_])
  ;
    true
  ).

choosePlay([],PieceLine, PieceColumn, MoveLine, MoveColumn, _CurrPlayer, _PiecesOut, _BarragoonsOut, BoardOut, BoardOut,
PieceLine, PieceColumn, MoveLine, MoveColumn).

choosePlay([BoardIn-PieceLine-PieceColumn-PlayLine-PlayColumn|Rest],  OriginLine, OriginColumn, MoveLine, MoveColumn,
CurrPlayer, PiecesOut, BarragoonsOut, BoardOut, FinalBoard, LineIn, ColumnIn, LineOut, ColumnOut):-
  countPieces(BoardIn, Pieces),
  (
  Pieces @< PiecesOut,
  NewPiecesOut is Pieces,
  NewOriginLine is PieceLine,
  NewOriginColumn is PieceColumn,
  NewMoveLine is PlayLine,
  NewMoveColumn is PlayColumn,
  choosePlay(Rest, NewOriginLine, NewOriginColumn, NewMoveLine, NewMoveColumn, CurrPlayer, NewPiecesOut, BarragoonsOut,
  BoardIn, FinalBoard, LineIn, ColumnIn, LineOut, ColumnOut)
  ;
  Pieces = PiecesOut,
  countBarragoons(BoardIn, Barragoons),
  Barragoons @< BarragoonsOut,
  NewBarragoonsOut is Barragoons,
  NewOriginLine is PieceLine,
  NewOriginColumn is PieceColumn,
  NewMoveLine is PlayLine,
  NewMoveColumn is PlayColumn,
  choosePlay(Rest, NewOriginLine, NewOriginColumn, NewMoveLine, NewMoveColumn, CurrPlayer, PiecesOut, NewBarragoonsOut,
  BoardIn, FinalBoard, LineIn, ColumnIn, LineOut, ColumnOut)
  ;
  choosePlay(Rest, OriginLine, OriginColumn, MoveLine, MoveColumn, CurrPlayer, PiecesOut, BarragoonsOut, BoardOut,
  FinalBoard, LineIn, ColumnIn, LineOut, ColumnOut)
  ).

countBarragoonLine([], 0).
countBarragoonLine([Head | Tail], N) :-
	(
		barragoon(Head) -> countBarragoonLine(Tail, NextN), N is NextN + 1
		;
		countBarragoonLine(Tail, N)
	).

countBarragoons([] , 0).
countBarragoons([Head | Tail], NTotal):-
	countBarragoons(Tail, NextNTotal),
	countBarragoonLine(Head, N),
	NTotal is NextNTotal + N.

countPiecesLine([], 0).
countPiecesLine([Head | Tail], N) :-
(
	Head \= empty -> countPiecesLine(Tail, NextN), N is NextN + 1
	;
	countPiecesLine(Tail, N)
).

countPieces([] , 0).
countPieces([Head | Tail], NTotal):-
  countPieces(Tail, NextNTotal),
  countPiecesLine(Head, N),
  NTotal is NextNTotal + N.
