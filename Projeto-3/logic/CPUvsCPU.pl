makeRandomPlay(PlayerNo, BoardIn, NewBoard-PieceLine-PieceColumn-MoveLine-MoveColumn) :-
    getPlayerChar(PlayerNo, CurrPlayer),
    findall(XBoard-A-B-C-D, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), PossiblePlays),
    random_permutation(PossiblePlays, [NewBoard-PieceLine-PieceColumn-MoveLine-MoveColumn|_]).