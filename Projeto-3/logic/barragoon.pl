putBarragoon(InBoard, Barragoon, Nline, Ncolumn, OutBoard) :-
	getPiece(InBoard, Nline, Ncolumn, empty),
	setPiece(InBoard, Nline, Ncolumn, Barragoon, OutBoard).

setBarragoon(BoardIn, Line, Column, Barragoon, BoardOut):-
                line(Line),
                col(Column),
                barragoon(Barragoon),
                getPiece(BoardIn, Line, Column, empty),
                setPiece(BoardIn, Line, Column, Barragoon, BoardOut).

setRandomBarragoon(BoardIn, Line, Column, Barragoon, BoardOut):-
                line(Line),
                col(Column),
                random_permutation([no,or,ol,ot,ob,th,tv,rr,rl,rt,rb,lr,ll,lt,lb,at], [Barragoon|_]),
                getPiece(BoardIn, Line, Column, empty),
                setPiece(BoardIn, Line, Column, Barragoon, BoardOut).

putBarragoonRandom(BoardIn, BoardOut-Line-Column-Barragoon):-
                now(X),
                setrand(X),
                findall(XBoard-A-B-C, A^B^setRandomBarragoon(BoardIn, A, B, C, XBoard), Boards),
                random_permutation(Boards, [BoardOut-Line-Column-Barragoon|_]).
