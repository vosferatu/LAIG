checkEmpty(BoardIn, PieceLine, PieceColumn):-
  getPiece(BoardIn, PieceLine, PieceColumn, empty).

checkOB(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'ob')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'tv')
  ).

checkLT(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'lt')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkRT(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rt')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkOT(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'ot')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'tv')
  ).

checkLB(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'lb')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkRB(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rb')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkOR(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'or')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'th')
  ).

checkRL(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rl')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkLL(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'll')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkOL(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'ol')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'th')
  ).

checkRR(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'rr')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkLR(BoardIn, PieceLine, PieceColumn):-
  (
    getPiece(BoardIn, PieceLine, PieceColumn, empty)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'lr')
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, 'at')
  ).

checkCaptureAT(CurrPlayer, BoardIn, PieceLine, PieceColumn):-
  (
    checkEmpty(BoardIn, PieceLine, PieceColumn)
    ;
    getPiece(BoardIn, PieceLine, PieceColumn, Piece),
    Piece \= 'at',
    name(Piece,[Color|_]),
    name(CurrPlayer, [Ascii|_]),
    Ascii \= Color
  ).

checkCapture(CurrPlayer, BoardIn, PieceLine, PieceColumn):-
  (
  checkEmpty(BoardIn, PieceLine, PieceColumn)
  ;
  getPiece(BoardIn, PieceLine, PieceColumn, Piece),
  name(Piece,[Color|_]),
  name(CurrPlayer, [Ascii|_]),
  Ascii \= Color
  ).
