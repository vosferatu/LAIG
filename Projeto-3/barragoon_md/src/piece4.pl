/**
* Validates all possible short moves for piece 3, starting by down
*/
shortMoveDownFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine + 3,
     MoveColumn = PieceColumn,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkOB(BoardIn, PieceLine + 2, PieceColumn),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn + 1,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkLT(BoardIn, PieceLine + 2, PieceColumn),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn - 1,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkRT(BoardIn, PieceLine + 2, PieceColumn),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn - 2,
     checkRT(BoardIn, PieceLine + 1, PieceColumn),
     checkOL(BoardIn, PieceLine + 1, PieceColumn - 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn + 2,
     checkLT(BoardIn, PieceLine + 1, PieceColumn),
     checkOR(BoardIn, PieceLine + 1, PieceColumn + 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible long moves for piece 4, starting by down
*/
moveDownFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine + 4,
     MoveColumn = PieceColumn,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkOB(BoardIn, PieceLine + 2, PieceColumn),
     checkOB(BoardIn, PieceLine + 3, PieceColumn),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 3,
     MoveColumn =:= PieceColumn + 1,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkOB(BoardIn, PieceLine + 2, PieceColumn),
     checkLT(BoardIn, PieceLine + 3, PieceColumn),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 3,
     MoveColumn =:= PieceColumn - 1,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkOB(BoardIn, PieceLine + 2, PieceColumn),
     checkRT(BoardIn, PieceLine + 3, PieceColumn),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn - 2,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkRT(BoardIn, PieceLine + 2, PieceColumn),
     checkOL(BoardIn, PieceLine + 2, PieceColumn - 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn + 2,
     checkOB(BoardIn, PieceLine + 1, PieceColumn),
     checkLT(BoardIn, PieceLine + 2, PieceColumn),
     checkOR(BoardIn, PieceLine + 2, PieceColumn + 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn + 3,
     checkLT(BoardIn, PieceLine + 1, PieceColumn),
     checkOR(BoardIn, PieceLine + 1, PieceColumn + 1),
     checkOR(BoardIn, PieceLine + 1, PieceColumn + 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn - 3,
     checkLT(BoardIn, PieceLine + 1, PieceColumn),
     checkOL(BoardIn, PieceLine + 1, PieceColumn - 1),
     checkOL(BoardIn, PieceLine + 1, PieceColumn - 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible short moves for piece 4, starting by up
*/
shortMoveUpFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine - 3,
     MoveColumn = PieceColumn,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkOT(BoardIn, PieceLine - 2, PieceColumn),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn + 1,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkRB(BoardIn, PieceLine - 2, PieceColumn),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn - 1,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkLB(BoardIn, PieceLine - 2, PieceColumn),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn - 2,
     checkLB(BoardIn, PieceLine - 1, PieceColumn),
     checkOL(BoardIn, PieceLine - 1, PieceColumn - 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 2,
     checkRB(BoardIn, PieceLine - 1, PieceColumn),
     checkOR(BoardIn, PieceLine - 1, PieceColumn + 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible long moves for piece 4, starting by up
*/
moveUpFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveLine =:= PieceLine - 4,
     MoveColumn = PieceColumn,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkOT(BoardIn, PieceLine - 2, PieceColumn),
     checkOT(BoardIn, PieceLine - 3, PieceColumn),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 3,
     MoveColumn =:= PieceColumn + 1,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkOT(BoardIn, PieceLine - 2, PieceColumn),
     checkRB(BoardIn, PieceLine - 3, PieceColumn),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 3,
     MoveColumn =:= PieceColumn - 1,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkOT(BoardIn, PieceLine - 2, PieceColumn),
     checkLB(BoardIn, PieceLine - 3, PieceColumn),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn - 2,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkLB(BoardIn, PieceLine - 2, PieceColumn),
     checkOL(BoardIn, PieceLine - 2, PieceColumn - 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn + 2,
     checkOT(BoardIn, PieceLine - 1, PieceColumn),
     checkRB(BoardIn, PieceLine - 2, PieceColumn),
     checkOR(BoardIn, PieceLine - 2, PieceColumn + 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 3,
     checkRB(BoardIn, PieceLine - 1, PieceColumn),
     checkOR(BoardIn, PieceLine - 1, PieceColumn + 1),
     checkOR(BoardIn, PieceLine - 1, PieceColumn + 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn - 3,
     checkLB(BoardIn, PieceLine - 1, PieceColumn),
     checkOL(BoardIn, PieceLine - 1, PieceColumn - 1),
     checkOL(BoardIn, PieceLine - 1, PieceColumn - 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible short moves for piece 4, starting by right
*/
shortMoveRightFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveColumn =:= PieceColumn + 3,
     MoveLine = PieceLine,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkOR(BoardIn, PieceLine, PieceColumn + 2),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 2,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkLL(BoardIn, PieceLine, PieceColumn + 2),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn + 2,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkRL(BoardIn, PieceLine, PieceColumn + 2),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn + 1,
     checkLL(BoardIn, PieceLine, PieceColumn + 1),
     checkOT(BoardIn, PieceLine - 1, PieceColumn + 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn + 1,
     checkRL(BoardIn, PieceLine, PieceColumn + 1),
     checkOB(BoardIn, PieceLine + 1, PieceColumn + 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible long moves for piece 4, starting by right
*/
moveRightFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveColumn =:= PieceColumn + 4,
     MoveLine = PieceLine,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkOR(BoardIn, PieceLine, PieceColumn + 2),
     checkOR(BoardIn, PieceLine, PieceColumn + 3),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 3,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkOR(BoardIn, PieceLine, PieceColumn + 2),
     checkLL(BoardIn, PieceLine, PieceColumn + 3),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn + 3,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkOR(BoardIn, PieceLine, PieceColumn + 2),
     checkRL(BoardIn, PieceLine, PieceColumn + 3),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn + 2,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkLL(BoardIn, PieceLine, PieceColumn + 2),
     checkOT(BoardIn, PieceLine - 1, PieceColumn + 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn + 2,
     checkOR(BoardIn, PieceLine, PieceColumn + 1),
     checkRL(BoardIn, PieceLine, PieceColumn + 2),
     checkOB(BoardIn, PieceLine + 1, PieceColumn + 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 3,
     MoveColumn =:= PieceColumn + 1,
     checkRL(BoardIn, PieceLine, PieceColumn + 1),
     checkOB(BoardIn, PieceLine + 1, PieceColumn + 1),
     checkOB(BoardIn, PieceLine + 2, PieceColumn + 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 3,
     MoveColumn =:= PieceColumn + 1,
     checkLL(BoardIn, PieceLine, PieceColumn + 1),
     checkOT(BoardIn, PieceLine - 1, PieceColumn + 1),
     checkOT(BoardIn, PieceLine - 2, PieceColumn + 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible short moves for piece 4, starting by left
*/
shortMoveLeftFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveColumn =:= PieceColumn - 3,
     MoveLine = PieceLine,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkOL(BoardIn, PieceLine, PieceColumn - 2),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn - 2,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkRR(BoardIn, PieceLine, PieceColumn - 2),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn - 2,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkLR(BoardIn, PieceLine, PieceColumn - 2),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn - 1,
     checkRR(BoardIn, PieceLine, PieceColumn - 1),
     checkOT(BoardIn, PieceLine - 1, PieceColumn - 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn - 1,
     checkLR(BoardIn, PieceLine, PieceColumn - 1),
     checkOB(BoardIn, PieceLine + 1, PieceColumn - 1),
     checkEmpty(BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible long moves for piece 4, starting by left
*/
moveLeftFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     MoveColumn =:= PieceColumn - 4,
     MoveLine = PieceLine,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkOL(BoardIn, PieceLine, PieceColumn - 2),
     checkOL(BoardIn, PieceLine, PieceColumn - 3),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 1,
     MoveColumn =:= PieceColumn + 3,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkOL(BoardIn, PieceLine, PieceColumn - 2),
     checkRR(BoardIn, PieceLine, PieceColumn - 3),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 1,
     MoveColumn =:= PieceColumn - 3,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkOL(BoardIn, PieceLine, PieceColumn - 2),
     checkLR(BoardIn, PieceLine, PieceColumn - 3),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 2,
     MoveColumn =:= PieceColumn - 2,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkRR(BoardIn, PieceLine, PieceColumn - 2),
     checkOT(BoardIn, PieceLine - 1, PieceColumn - 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 2,
     MoveColumn =:= PieceColumn - 2,
     checkOL(BoardIn, PieceLine, PieceColumn - 1),
     checkLR(BoardIn, PieceLine, PieceColumn - 2),
     checkOB(BoardIn, PieceLine + 1, PieceColumn - 2),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine + 3,
     MoveColumn =:= PieceColumn - 1,
     checkLR(BoardIn, PieceLine, PieceColumn - 1),
     checkOB(BoardIn, PieceLine + 1, PieceColumn - 1),
     checkOT(BoardIn, PieceLine + 2, PieceColumn - 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ;
     MoveLine =:= PieceLine - 3,
     MoveColumn =:= PieceColumn - 1,
     checkRR(BoardIn, PieceLine, PieceColumn - 1),
     checkOT(BoardIn, PieceLine - 1, PieceColumn - 1),
     checkOT(BoardIn, PieceLine - 2, PieceColumn - 1),
     checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
  ).

/**
* Validates all possible moves for piece 4
*/
validateFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
  (
     moveDownFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     moveUpFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     moveRightFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     moveLeftFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     shortMoveUpFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     shortMoveDownFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     shortMoveLeftFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ;
     shortMoveRightFour(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
  ).
