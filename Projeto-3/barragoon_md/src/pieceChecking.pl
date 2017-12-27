/**
* Check if a place is empty
*/
checkEmpty(BoardIn, PieceLine, PieceColumn):-
  getPiece(BoardIn, PieceLine, PieceColumn, '  ').

/**
* Check if it is possible to make a OB move in a given place
*/
checkOB(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'ob')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'tv')
  ).

/**
* Check if it is possible to make a LT move in a given place
*/
checkLT(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'lt')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a RT move in a given place
*/
checkRT(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rt')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a OT move in a given place
*/
checkOT(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'ot')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'tv')
  ).

/**
* Check if it is possible to make a LB move in a given place
*/
checkLB(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'lb')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a RB move in a given place
*/
checkRB(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rb')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a OR move in a given place
*/
checkOR(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'or')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'th')
  ).

/**
* Check if it is possible to make a RL move in a given place
*/
checkRL(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rl')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a LL move in a given place
*/
checkLL(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'll')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a OL move in a given place
*/
checkOL(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'ol')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'th')
  ).

/**
* Check if it is possible to make a RR move in a given place
*/
checkRR(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rr')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if it is possible to make a LR move in a given place
*/
checkLR(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, '  ')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'lr')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

/**
* Check if a piece 2 can capture in a given place
*/
checkCaptureAT(CurrPlayer, BoardIn, PieceLine, PieceColumn):-
  (
    checkEmpty(BoardIn, PieceLine, PieceColumn)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, Piece),
    Piece \= 'at',
    name(Piece,[_|[Color|_]]),
    name(CurrPlayer, [Ascii|_]),
    Ascii \= Color
  ).

/**
* Check if a piece 3 or 4 can capture in a given place
*/
checkCapture(CurrPlayer, BoardIn, PieceLine, PieceColumn):-
  (
  checkEmpty(BoardIn, PieceLine, PieceColumn)
  ;
  getPiece(BoardIn, PieceLine, PieceColumn, Piece),
  name(Piece,[_|[Color|_]]),
  name(CurrPlayer, [Ascii|_]),
  Ascii \= Color
  ).
