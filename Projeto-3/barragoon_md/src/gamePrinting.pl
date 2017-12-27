/**
*	Board printing function
*/
gamePrint(Board) :-
	write('    1  2  3  4  5  6  7  '),	nl,
	printBlackLine,
	printRowByRow(1, Board).

/**
*	Prints divisory black line
*/
printBlackLine :-
	write('  +--+--+--+--+--+--+--+'),
	nl.

/**
*	Prints row by row
*/
printRowByRow(_, []).
printRowByRow(NoLine, [Line|Rest]) :-
	write(NoLine),
	write(' |'),
	printSingleRow(Line),
	NewNoLine is NoLine + 1,
	printRowByRow(NewNoLine, Rest).

/**
*	Prints single row
*/
printSingleRow([Cell]):-
	write(Cell),
	write('|'),
	nl,
	printBlackLine.
printSingleRow([Cell|More]):-
	write(Cell),
	write('|'),
	printSingleRow(More).

/**
*	Shows game Result
*/
showResult(Loser):-
	(
		Loser=66, name(X,[87]), write(X)
		;
		Loser=87, name(X,[66]), write(X)
	),
	write(' won! Congrats!'),	nl.
