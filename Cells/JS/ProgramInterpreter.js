function Interpreter(program){
	this.program = program;
	this.pProgram = -1;
	this.nextProgramStart = 0;

	this.currentTime = 0;
}

Interpreter.prototype = {
	progress: function(t){
		this.currentTime = t;

		if(this.nextProgramStart == 0)
			this.nextProgramStart = this.nextProgramStart = this.program[this.pProgram + 1].start;

		if(this.currentTime >= this.nextProgramStart)
			this.loadNextEvent();
	},

	loadNextEvent: function(){
		this.pProgram = this.pProgram + 1;

		if(this.program[this.pProgram + 1].start)
			this.nextProgramStart = this.program[this.pProgram + 1].start;

		this.program[this.pProgram].execute();
	}
}


function Event(start, end, executeFunction){
	this.start = start;
	this.end = end;
	this.executeFunction = executeFunction;
}

Event.prototype = {
	execute: function(){
		this.executeFunction();
	}
}
