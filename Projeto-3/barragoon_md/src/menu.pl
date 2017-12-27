/**
*	Game level selection menu
*/
levelSelection(Level):-
	write('*** SELECT DIFFICULTY ***'), nl,
	write('1. Easier'), nl,
	write('2. Harder'), nl,
	prompt(X,'Select an option (0 to exit): '),
	read(Level), nl,
	prompt('Select an option (0 to exit): ', X).

/**
* Game menu
*/
menu:-
	write('*** BARRAGOON ***'), nl,
	write('1. Human vs Human'), nl,
	write('2. Human vs CPU'), nl,
	write('3. CPU vs CPU'), nl,
	write('Select an option (0 to exit): '),	read(Option), nl,
	menuExe(Option).

/**
*	Executes menu option
*/
menuExe(Option):-
	(
	  Option=1, playHvsH
	  ;
	  Option=2, levelSelection(Level), levelSelectionExe(Option, Level)
	  ;
	  Option=3, levelSelection(Level), levelSelectionExe(Option, Level)
	  ;
	  Option=0, abort
	).

/*
*	Executes level selection menu option
*/
levelSelectionExe(Option, Level):-
	(
	  Option=2, Level=1, playRandomCPUvsH
        ;
	  Option=3, Level=1, playRandomCPUvsCPU
	;
	  Option=2, Level=2, playAICPUvsH
	;
	  Option=3, Level=2, playAICPUvsCPU
	).
