getPiece(Board, Nline, Ncolumn, Piece) :-
	getElePos(Nline, Board, Line),
	getElePos(Ncolumn, Line, Piece).

getElePos(1, [Element|_], Element).
getElePos(Pos, [_|Rest], Element) :-
	Pos > 1,
	Next is Pos-1,
	getElePos(Next, Rest, Element).

getColor(Piece, Color):-
	name(Piece,[_|[Head|_]]),
	name(Color, [Head]).

getNumber(Piece, Number):-
	name(Piece,[_|[Head|_]]),
	name(Number,[Head]).

setPiece(InBoard, Nline, Ncolumn, Piece, OutBoard) :-
	setInLine(Nline, InBoard, Ncolumn, Piece, OutBoard).

setInLine(1, [Line|Rest], Ncolumn, Piece, [NewLine|Rest]):-
	setInColumn(Ncolumn, Line, Piece, NewLine).
setInLine(Pos, [Line|Rest], Ncolumn, Piece, [Line|NewLine]):-
	Pos > 1,
	Next is Pos-1,
	setInLine(Next, Rest, Ncolumn, Piece, NewLine).

setInColumn(1, [_|Rest], Piece, [Piece|Rest]).
setInColumn(Pos, [X|Rest], Piece, [X|NewRest]):-
	Pos > 1,
	Next is Pos-1,
	setInColumn(Next, Rest, Piece, NewRest).
