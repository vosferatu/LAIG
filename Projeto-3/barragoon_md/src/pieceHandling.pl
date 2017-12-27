/**
*	Gets game piece at a given position
*/
getPiece(Board, Nline, Ncolumn, Piece) :-
	getElePos(Nline, Board, Line),
	getElePos(Ncolumn, Line, Piece).

/**
*	Get piece in a given line position
*/
getElePos(1, [Element|_], Element).
getElePos(Pos, [_|Rest], Element) :-
	Pos > 1,
	Next is Pos-1,
	getElePos(Next, Rest, Element).

/**
*	Gets a piece color
*/
getColor(Piece, Color):-
	name(Piece,[_|[Head|_]]),
	name(Color, [Head]).

/**
*	Gets a piece number
*/
getNumber(Piece, Number):-
	name(Piece,[Head|_]),
	name(Number,[Head]).

/**
*	Set piece at a given positon
*/
setPiece(InBoard, Nline, Ncolumn, Piece, OutBoard) :-
	setInLine(Nline, InBoard, Ncolumn, Piece, OutBoard).

/**
*	Set piece at a given line
*/
setInLine(1, [Line|Rest], Ncolumn, Piece, [NewLine|Rest]):-
	setInColumn(Ncolumn, Line, Piece, NewLine).
setInLine(Pos, [Line|Rest], Ncolumn, Piece, [Line|NewLine]):-
	Pos > 1,
	Next is Pos-1,
	setInLine(Next, Rest, Ncolumn, Piece, NewLine).

/**
*	Set piece at a given column
*/
setInColumn(1, [_|Rest], Piece, [Piece|Rest]).
setInColumn(Pos, [X|Rest], Piece, [X|NewRest]):-
	Pos > 1,
	Next is Pos-1,
	setInColumn(Next, Rest, Piece, NewRest).
