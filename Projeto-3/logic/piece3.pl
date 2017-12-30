shortMoveDownThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveLine =:= PieceLine + 2,
       MoveColumn = PieceColumn,
       checkOB(BoardIn, PieceLine + 1, PieceColumn),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn + 1,
       checkLT(BoardIn, PieceLine + 1, PieceColumn),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn - 1,
       checkRT(BoardIn, PieceLine + 1, PieceColumn),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ).

moveDownThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveLine =:= PieceLine + 3,
       MoveColumn = PieceColumn,
       checkOB(BoardIn, PieceLine + 1, PieceColumn),
       checkOB(BoardIn, PieceLine + 2, PieceColumn),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 2,
       MoveColumn =:= PieceColumn + 1,
       checkOB(BoardIn, PieceLine + 1, PieceColumn),
       checkLT(BoardIn, PieceLine + 2, PieceColumn),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 2,
       MoveColumn =:= PieceColumn - 1,
       checkOB(BoardIn, PieceLine + 1, PieceColumn),
       checkRT(BoardIn, PieceLine + 2, PieceColumn),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn - 2,
       checkRT(BoardIn, PieceLine + 1, PieceColumn),
       checkOL(BoardIn, PieceLine + 1, PieceColumn - 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn + 2,
       checkLT(BoardIn, PieceLine + 1, PieceColumn),
       checkOR(BoardIn, PieceLine + 1, PieceColumn + 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ).

shortMoveUpThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveLine =:= PieceLine - 2,
       MoveColumn = PieceColumn,
       checkOT(BoardIn, PieceLine - 1, PieceColumn),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn + 1,
       checkRB(BoardIn, PieceLine - 1, PieceColumn),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn - 1,
       checkLB(BoardIn, PieceLine - 1, PieceColumn),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ).

moveUpThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveLine =:= PieceLine - 3,
       MoveColumn = PieceColumn,
       checkOT(BoardIn, PieceLine - 1, PieceColumn),
       checkOT(BoardIn, PieceLine - 2, PieceColumn),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 2,
       MoveColumn =:= PieceColumn + 1,
       checkOT(BoardIn, PieceLine - 1, PieceColumn),
       checkRB(BoardIn, PieceLine - 2, PieceColumn),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 2,
       MoveColumn =:= PieceColumn - 1,
       checkOT(BoardIn, PieceLine - 1, PieceColumn),
       checkLB(BoardIn, PieceLine - 2, PieceColumn),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn - 2,
       checkLB(BoardIn, PieceLine - 1, PieceColumn),
       checkOL(BoardIn, PieceLine - 1, PieceColumn - 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn + 2,
       checkRB(BoardIn, PieceLine - 1, PieceColumn),
       checkOR(BoardIn, PieceLine - 1, PieceColumn + 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ).

shortMoveRightThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveColumn =:= PieceColumn + 2,
       MoveLine = PieceLine,
       checkOR(BoardIn, PieceLine, PieceColumn + 1),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn + 1,
       checkRL(BoardIn, PieceLine, PieceColumn + 1),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn + 1,
       checkLL(BoardIn, PieceLine, PieceColumn + 1),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ).

moveRightThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveColumn =:= PieceColumn + 3,
       MoveLine = PieceLine,
       checkOR(BoardIn, PieceLine, PieceColumn + 1),
       checkOR(BoardIn, PieceLine, PieceColumn + 2),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn + 2,
       checkOR(BoardIn, PieceLine, PieceColumn + 1),
       checkLL(BoardIn, PieceLine, PieceColumn + 2),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn + 2,
       checkOR(BoardIn, PieceLine, PieceColumn + 1),
       checkRL(BoardIn, PieceLine, PieceColumn + 2),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 2,
       MoveColumn =:= PieceColumn + 1,
       checkLL(BoardIn, PieceLine, PieceColumn + 1),
       checkOT(BoardIn, PieceLine - 1, PieceColumn + 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 2,
       MoveColumn =:= PieceColumn + 1,
       checkRL(BoardIn, PieceLine, PieceColumn + 1),
       checkOB(BoardIn, PieceLine + 1, PieceColumn + 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ).

shortMoveLeftThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveColumn =:= PieceColumn - 2,
       MoveLine = PieceLine,
       checkOL(BoardIn, PieceLine, PieceColumn - 1),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn - 1,
       checkRR(BoardIn, PieceLine, PieceColumn - 1),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn - 1,
       checkLR(BoardIn, PieceLine, PieceColumn - 1),
       checkEmpty(BoardIn, MoveLine, MoveColumn)
    ).

moveLeftThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       MoveColumn =:= PieceColumn - 3,
       MoveLine = PieceLine,
       checkOL(BoardIn, PieceLine, PieceColumn - 1),
       checkOL(BoardIn, PieceLine, PieceColumn - 2),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 1,
       MoveColumn =:= PieceColumn - 2,
       checkOL(BoardIn, PieceLine, PieceColumn - 1),
       checkRR(BoardIn, PieceLine, PieceColumn - 2),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 1,
       MoveColumn =:= PieceColumn - 2,
       checkOL(BoardIn, PieceLine, PieceColumn - 1),
       checkLR(BoardIn, PieceLine, PieceColumn - 2),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine - 2,
       MoveColumn =:= PieceColumn - 1,
       checkRR(BoardIn, PieceLine, PieceColumn - 1),
       checkOT(BoardIn, PieceLine - 1, PieceColumn - 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ;
       MoveLine =:= PieceLine + 2,
       MoveColumn =:= PieceColumn - 1,
       checkLR(BoardIn, PieceLine, PieceColumn - 1),
       checkOB(BoardIn, PieceLine + 1, PieceColumn - 1),
       checkCapture(CurrPlayer, BoardIn, MoveLine, MoveColumn)
    ).

validateThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn):-
    (
       moveDownThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       moveUpThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       moveRightThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       moveLeftThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       shortMoveUpThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       shortMoveDownThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       shortMoveLeftThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ;
       shortMoveRightThree(BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
    ).
