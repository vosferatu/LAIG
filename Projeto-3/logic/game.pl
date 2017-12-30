:- include('pieceHandling.pl').
:- include('pieceChecking.pl').
:- include('barragoon.pl').
:- include('piece2.pl').
:- include('piece3.pl').
:- include('piece4.pl').
:- include('defs.pl').
:- include('CPUvsCPU.pl').
:- include('pcAI.pl').
:- use_module(library(lists)).
:- use_module(library(random)).
:- use_module(library(system)).
:- dynamic board/1.
:- dynamic player/1.

initialBoard([[empty,'w4','w3',empty,'w3','w4',empty],
		[empty,empty,'w2','w3','w2',empty,empty],
		[empty,empty,empty,empty,empty,empty,empty],
		[empty,'no',empty,empty,empty,'no',empty],
		['no',empty,'no',empty,'no',empty,'no'],
		[empty,'no',empty,empty,empty,'no',empty],
		[empty,empty,empty,empty,empty,empty,empty],
		[empty,empty,'b2','b3','b2',empty,empty],
		[empty,'b4','b3',empty,'b3','b4',empty]]).

getPlayerChar(1, 'w').
getPlayerChar(2, 'b').

noPiece(Board, Color) :-
	member(Line, Board),
	member(Piece, Line),
	name(Piece,[Color|_]),
	!, fail.
noPiece(_,_).

gameOver(Board, Loser):-
	(
		noPiece(Board, 98), Loser=98
	;
		noPiece(Board, 119), Loser=119
	;
		Loser = 0
	).

movePiece(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn, OutBoard):-
		line(PieceLine),
		col(PieceColumn),
		line(MoveLine),
		col(MoveColumn),
		getPiece(BoardIn, PieceLine, PieceColumn, Piece),
		piece(Piece),
		name(Piece,[Color|_]),
		name(CurrPlayer, [Color]),
		getNumber(Piece, Number),
		(
		   Number=2, validateTwo(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
		;
		   Number=3, validateThree(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
		;
		   Number=4, validateFour(CurrPlayer, BoardIn, PieceLine, PieceColumn, MoveLine, MoveColumn)
		),
		getPiece(BoardIn, PieceLine, PieceColumn, Piece),
		setPiece(BoardIn, PieceLine, PieceColumn, empty, NewBoard),
		setPiece(NewBoard, MoveLine, MoveColumn, Piece, OutBoard).

tryPlay(PlayerNo, BoardIn, PieceLine, PieceCol, MoveLine, MoveCol, NewBoard):-
		getPlayerChar(PlayerNo, CurrPlayer),
		movePiece(CurrPlayer, BoardIn, PieceLine, PieceCol, MoveLine, MoveCol, NewBoard).