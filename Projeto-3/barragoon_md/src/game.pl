:- include('gamePrinting.pl').
:- include('pieceHandling.pl').
:- include('barragoon.pl').
:- include('piece2.pl').
:- include('piece3.pl').
:- include('piece4.pl').
:- include('pieceChecking.pl').
:- include('defs.pl').
:- include('menu.pl').
:- include('HvsH.pl').
:- include('HvsCPU.pl').
:- include('CPUvsCPU.pl').
:-include('pcAI.pl').
:- use_module(library(lists)).
:- use_module(library(random)).
:- use_module(library(system)).
:- dynamic board/1.
:- dynamic player/1.

/**
* Initial board
*/
initialBoard([	['  ','4W','3W','  ','3W','4W','  '],
		['  ','  ','2W','3W','2W','  ','  '],
		['  ','  ','  ','  ','  ','  ','  '],
		['  ','no','  ','  ','  ','no','  '],
		['no','  ','no','  ','no','  ','no'],
		['  ','no','  ','  ','  ','no','  '],
		['  ','  ','  ','  ','  ','  ','  '],
		['  ','  ','2B','3B','2B','  ','  '],
		['  ','4B','3B','  ','3B','4B','  ']]).

/**
* Initial player
*/
initialPlayer('W').

/**
* Changes between players
*/
changePlayer('W', 'B').
changePlayer('B', 'W').

/**
* Checks if there are pieces of a given color on board
*/
noPiece(Board, Color) :-
		member(Line, Board),
		member(Piece, Line),
		name(Piece,[_|[Color|_]]),
		!, fail.
noPiece(_,_).

/**
* Game over condition checking
*/
gameOver(Board, Loser):-
		(
		   noPiece(Board, 66), Loser=66
		;
		   noPiece(Board, 87), Loser=87
		).

/**
* Reads an integer number, with a given prompt
*/
readInteger(Prompt,Integer):-
  		repeat,
      		prompt(X, Prompt),
      		read(Integer),
      		number(Integer),
		prompt(Prompt, X).

/**
* Read player move
*/
readMove(PieceLine, PieceColumn, MoveLine, MoveColumn):-
		write('*** SELECT PIECE ***'),	nl,
		readInteger('Line: ', PieceLine), nl,
		readInteger('Column: ', PieceColumn), nl,
		nl,
		write('*** SELECT MOVE ***'),	nl,
		readInteger('Line: ', MoveLine), nl,
		readInteger('Column: ', MoveColumn), nl.

/**
* Move a piece from given coordinates to other given coordinates
*/
movePiece(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn, OutBoard):-
		line(PieceLine),
		col(PieceColumn),
		line(MoveLine),
		col(MoveColumn),
		getPiece(BoardIn, PieceLine, PieceColumn, Piece),
		piece(Piece),
		name(Piece,[_|[Color|_]]),
		name(CurrPlayer, [Color|_]),
		getNumber(Piece, Number),
		(
		   Number=2, validateTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
		;
		   Number=3, validateThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
		;
		   Number=4, validateFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
		),
		getPiece(BoardIn, PieceLine, PieceColumn, Piece),
		setPiece(BoardIn, PieceLine, PieceColumn, '  ', NewBoard),
		setPiece(NewBoard, MoveLine, MoveColumn, Piece, OutBoard).

/**
* Ask and validate human player play
*/
askPlay(CurrPlayer, BoardIn, BoardOut):-
    		findall(XBoard, A^B^C^D^movePiece(CurrPlayer, BoardIn, A, B, C, D, XBoard), PossiblePlays),
    		(
    		   PossiblePlays \= []
    		;
    		   changePlayer(CurrPlayer, NewPlayer),
    		   gamePrint(BoardIn), nl,
    		   write(NewPlayer), write(' won!'),
    		   abort
    		),
    		gamePrint(BoardIn),
		repeat,
		nl, write(CurrPlayer), write(' turn'), nl, nl,
		once(readMove(PieceLine, PieceColumn, MoveLine, MoveColumn)),
		movePiece(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn, NewBoard),
		getPiece(BoardIn, MoveLine, MoveColumn, Piece),
		(
		   gameOver(NewBoard, Loser),
		   showResult(Loser),
		   abort
		;
		   barragoon(Piece),
		   write(CurrPlayer), write(' puts barragoon:'), nl,
		   copy_term(NewBoard, NewBoard),
		   putBarragoon(NewBoard, Board1),
		   copy_term(Board1, BoardOut)
		;
		   getColor(Piece, Color),
		   Color \= ' ',
		   changePlayer(CurrPlayer, NewPlayer),
		   write(NewPlayer), write(' puts barragoon:'), nl,
		   putBarragoon(NewBoard, Board1),
		   write(CurrPlayer), write(' puts barragoon:'), nl,
		   putBarragoon(Board1, Board2),
		   copy_term(Board2, BoardOut)
		;
		   copy_term(NewBoard, BoardOut)
		).
