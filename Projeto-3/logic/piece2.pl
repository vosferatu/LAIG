shortMoveTwo(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine + 1,
     MoveColumn = PieceColumn,
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn = PieceColumn,
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveColumn =:= PieceColumn - 1,
     MoveLine = PieceLine,
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveColumn =:= PieceColumn + 1,
     MoveLine = PieceLine,
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ).

moveDownTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine + 2,
     MoveColumn = PieceColumn,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn + 1,
     checkLT(BoardIn, PieceLine + 1, PieceColumn),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn - 1,
     checkRT(BoardIn, PieceLine + 1, PieceColumn),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

moveUpTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine - 2,
     MoveColumn = PieceColumn,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn - 1,
     checkLB(BoardIn, PieceLine - 1, PieceColumn),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 1,
     checkRB(BoardIn, PieceLine - 1, PieceColumn),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

moveRightTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveColumn =:= PieceColumn + 2,
     MoveLine = PieceLine,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn + 1,
     checkRL(BoardIn, PieceLine, PieceColumn + 1),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 1,
     checkLL(BoardIn, PieceLine, PieceColumn + 1),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

moveLeftTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveColumn =:= PieceColumn - 2,
     MoveLine = PieceLine,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn - 1,
     checkRR(BoardIn, PieceLine, PieceColumn - 1),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn - 1,
     checkLR(BoardIn, PieceLine, PieceColumn - 1),
     checkCaptureAT(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

validateTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     moveDownTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     moveUpTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     moveRightTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     moveLeftTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     shortMoveTwo(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ).
