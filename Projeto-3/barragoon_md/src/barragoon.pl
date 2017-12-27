/**
* Place the Barragoon with the desired symbol in the desired position, if it is free
*/
putBarragoon(InBoard, OutBoard):-
	repeat,
	nl, write('*** SELECT BARRAOON ***'), nl,
	prompt(X, 'Barragoon: '),
	read(Barragoon),
	prompt('Barragoon: ', X),
	barragoon(Barragoon),
	nl,
	write('*** SELECT MOVE ***'),	nl,
	readInteger('Line: ', Nline), nl,
	readInteger('Column: ', Ncolumn), nl,
	getPiece(InBoard, Nline, Ncolumn, '  '),
	setPiece(InBoard, Nline, Ncolumn, Barragoon, OutBoard).

/*
*	Auxiliar for findall of putBarragoonRandom
*	Finds free random places for barragoon
*/
setBarragoon(BoardIn, Line, Column, BoardOut):-
                line(Line),
                col(Column),
                random_permutation([no,or,ol,ot,ob,th,tv,rr,rl,rt,rb,lr,ll,lt,lb,at], [Barragoon|_]),
                getPiece(BoardIn, Line, Column, '  '),
                setPiece(BoardIn, Line, Column, Barragoon, BoardOut).

/*
*	Puts barragoon in a random place
*/
putBarragoonRandom(BoardIn, BoardOut):-
                now(X),
                setrand(X),
                findall(XBoard, A^B^setBarragoon(BoardIn, A, B, XBoard), Boards),
                random_permutation(Boards, [BoardOut|_]).
