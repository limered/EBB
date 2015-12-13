var randomTimer = null;

/**
* Array containing the whole chorio.
*/
var cellProgramm = [
	new Event(10*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 300, OBJECT_TYPES.GROW, 4000);
		
		window.setTimeout(function(){
			changeMovementEffect();
		}, t3.Math.randInt(10000, 20000));
	}),
	new Event(14*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 500, OBJECT_TYPES.SHRINK, 4000);
	}),
	new Event(18*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 500, OBJECT_TYPES.COLOR, 2000);
	}),
	new Event(20.1*1000, 0, function(){
		cellsDemo.addNonCell(0, 2000, 0, 0, 100, OBJECT_TYPES.CLEAR_COLOR_ALL, 1000);
	}),
	new Event(21*1000, 0, function(){
		cellsDemo.addNonCell(500, 0, -20, 0, 300, OBJECT_TYPES.PUSH, 2000);
		cellsDemo.addNonCell(-500, 0, 20, 0, 300, OBJECT_TYPES.PUSH, 2000);
		cellsDemo.addNonCell(0, -500, 0, 20, 300, OBJECT_TYPES.PUSH, 2000);
		cellsDemo.addNonCell(0, 500, 0, -200, 300, OBJECT_TYPES.PUSH, 2000);
	}),
	new Event(24*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 1000, OBJECT_TYPES.PULL, 500);
	}),
	new Event(30*1000, 0, function(){
		cellsDemo.addNonCell(800, 0, -5, 0, 400, OBJECT_TYPES.COLOR, 5000);
	}),
	new Event(34*1000, 0, function(){
		cellsDemo.addNonCell(800, 0, -5, 0, 400, OBJECT_TYPES.CLEAR_COLOR, 5000);
	}),
	new Event(39.6*1000, 0, function(){
		cellsDemo.addNonCell(0, 2000, 0, 0, 100, OBJECT_TYPES.CLEAR_COLOR_ALL, 1000);
	}),
	
	new Event(40*1000, 0, function(){
		addLine(v2(500, 500), v2(500, -500), 10, v2(-5, 0), [70, 100], OBJECT_TYPES.PUSH,[5000, 5000]);
	}),
	new Event(45*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [70, 100], OBJECT_TYPES.PULL,[5000, 5000]);
	}),
	new Event(50*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[5000, 5000]);
	}),
	new Event(51*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [70, 100], OBJECT_TYPES.COLOR,[5000, 5000]);
	}),
	new Event(56*1000, 0, function(){
		cellsDemo.addNonCell(0, 2000, 0, 0, 100, OBJECT_TYPES.CLEAR_COLOR_ALL, 1000);
	}),
	new Event(57*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [100, 200], OBJECT_TYPES.ROTATE_RIGHT,[5000, 5000]);
	}),
	new Event(62*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.ROTATE_LEFT,[5000, 5000]);
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[5000, 5000]);
	}),
	new Event(66*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [100, 200], OBJECT_TYPES.SHRINK,[5000, 5000]);
	}),
	new Event(70*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [100, 200], OBJECT_TYPES.SHRINK,[5000, 5000]);
	}),
	
	new Event(74*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 500, OBJECT_TYPES.PULL, 3000);
		cellsDemo.addNonCell(0, 0, 0, 0, 300, OBJECT_TYPES.SHRINK, 3000);
		cellsDemo.addNonCell(0, 0, 0, 0, 100, OBJECT_TYPES.SHRINK, 3000);
	}),
	
	new Event(83*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [100, 200], OBJECT_TYPES.SHRINK,[5000, 5000]);
	}),
	
	new Event(93*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 500, OBJECT_TYPES.PULL, 3000);
		cellsDemo.addNonCell(0, 0, 0, 0, 300, OBJECT_TYPES.SHRINK, 3000);
		cellsDemo.addNonCell(0, 0, 0, 0, 100, OBJECT_TYPES.SHRINK, 3000);
	}),
	new Event(96*1000, 0, function(){
		cellsDemo.addNonCell(0, 0, 0, 0, 500, OBJECT_TYPES.PUSH, 1500);
		cellsDemo.addNonCell(0, 0, 0, 0, 800, OBJECT_TYPES.GROW, 1500);
		cellsDemo.addNonCell(0, 0, 0, 0, 800, OBJECT_TYPES.GROW, 1500);
	}),


	new Event(102*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.ROTATE_LEFT,[5000, 5000]);
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[5000, 5000]);
	}),
	
	new Event(108*1000, 0, function(){
		cellsDemo.addNonCell(500, 0, -20, 0, 300, OBJECT_TYPES.PUSH, 2000);
		cellsDemo.addNonCell(-500, 0, 20, 0, 300, OBJECT_TYPES.PUSH, 2000);
		cellsDemo.addNonCell(0, -500, 0, 20, 300, OBJECT_TYPES.PUSH, 2000);
		cellsDemo.addNonCell(0, 500, 0, -200, 300, OBJECT_TYPES.PUSH, 2000);
	}),
	

	new Event(115*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 10), v2(), [100, 200], OBJECT_TYPES.ROTATE_LEFT,[15000, 15000]);
		
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 10), v2(), [100, 200], OBJECT_TYPES.COLOR,[5000, 5000]);
	}),
	new Event(130*1000, 0, function(){
		cellsDemo.addNonCell(0, 2000, 0, 0, 100, OBJECT_TYPES.CLEAR_COLOR_ALL, 1000);
	}),
	new Event(139*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 10), v2(t3.Math.randInt(-10, 10),t3.Math.randInt(-10, 10)), [100, 200], OBJECT_TYPES.PUSH, [5000, 5000]);
	}),
	
	new Event(155*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 20), v2(t3.Math.randInt(-10, 10),t3.Math.randInt(-10, 10)), [10, 50], OBJECT_TYPES.PULL, [1000, 5000]);
	}),
	
	new Event(163*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(10, 20), v2(t3.Math.randInt(-10, 10),t3.Math.randInt(-10, 10)), [100, 150], OBJECT_TYPES.GROW, [3000, 5000]);
	}),
	new Event(170*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 10), v2(), [100, 150], OBJECT_TYPES.ROTATE_RIGHT, [3000, 5000]);
	}),
	new Event(185*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 10), v2(), [100, 150], OBJECT_TYPES.ROTATE_LEFT, [5000, 8000]);
		
		addRandom(v2(500, 500), v2(-500, -500), t3.Math.randInt(3, 5), v2(), [50, 100], OBJECT_TYPES.COLOR, [1000, 3000]);
	}),
	new Event(193*1000, 0, function(){
		cellsDemo.addNonCell(0, 2000, 0, 0, 100, OBJECT_TYPES.CLEAR_COLOR_ALL, 1000);
	}),
	new Event(200*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.ROTATE_LEFT,[15000, 15000]);
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[15000, 15000]);
	}),
	new Event(215*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[5000, 5000]);
	}),
	new Event(228*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [100, 200], OBJECT_TYPES.ROTATE_RIGHT,[5000, 5000]);
	}),
	new Event(244*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, null, [100, 200], OBJECT_TYPES.GROW,[5000, 5000]);
	}),
	new Event(249*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.ROTATE_RIGHT,[5000, 10000]);
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[5000, 10000]);
	}),
	new Event(254*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PULL,[5000, 10000]);
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.PUSH,[5000, 10000]);
	}),
	new Event(270*1000, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.ROTATE_LEFT,[10000, 10000]);
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(), [100, 200], OBJECT_TYPES.ROTATE_RIGHT,[10000, 10000]);
	}),
	new Event(309*1000 + 500, 0, function(){
		addRandom(v2(500, 500), v2(-500, -500), 10, v2(0, 0), [500, 500], OBJECT_TYPES.GROW, [30000, 30000]);
	}),
	new Event(319*1000 + 500, 0, function(){
		//end
	})
]

function randomTimerFunction(){
	var rand = t3.Math.randInt(0, 4);
	switch(rand){
		case 0:
			addLine(v2(500, 500), v2(500, -500), t3.Math.randInt(0, 20), v2(t3.Math.randInt(-20, -2), 0), [70, 100], t3.Math.randInt(0, 10), [1000, 5000]);
			break;
		case 1:
			addLine(v2(500, 500), v2(-500, 500), t3.Math.randInt(0, 20), v2(0, t3.Math.randInt(-20, -2)), [70, 100], t3.Math.randInt(0, 10), [1000, 5000]);
			break;
		case 2:
			addLine(v2(-500, 500), v2(-500, -500), t3.Math.randInt(0, 20), v2(t3.Math.randInt(2, 20), 0), [70, 100], t3.Math.randInt(0, 10), [1000, 5000]);
			break;
		case 3:
			addLine(v2(500, -500), v2(-500, -500), t3.Math.randInt(0, 20), v2(0, t3.Math.randInt(2, 20)), [70, 100], t3.Math.randInt(0, 10), [1000, 5000]);
			break;
		default:
			break;
	}
	
//	randomTimer = window.setTimeout(randomTimerFunction, t3.Math.randInt(RANDOM_TIMER_MIN, RANDOM_TIMER_MAX));
}


/**
* Adds a line of equidistant effect cells
* @param: {THREE.Vector2} start point
* @param: {THREE.Vector2} end point
* @param: {Integer} parts # of effect cells
* @param: {THREE.Vector2} direction of cells
* @param: {IntArray} sizeRange of the cells
* @param: {OBJECT_TYPE} type of the cells
* @param: {IntArray} liveRange min and max values for the live duration of cells
*/
function addLine(start, stop, parts, direction, sizeRange, type, liveRange){
	var step = 1.0/parts;
	var res = [];
	for (var i = 0; i <= parts; i++){
		var pos = start.clone().lerp(stop, i*step);
		res.push({
			x: pos.x,
			y: pos.y,
			vX:direction.x,
			vY:direction.y,
			radius:t3.Math.randInt(sizeRange[0], sizeRange[1]),
			type: type,
			deathTime:t3.Math.randInt(liveRange[0], liveRange[1])
		});
	}
	cellsDemo.addNonCellBatch(res);
}
/**
 * Adds Random Cells in an area defined by min and max
 * @param {THREE.Vector2} max       Max Point for area rect
 * @param {THREE.Vector2} min       Min Point for area rect
 * @param {Number}        count     Number of Cells to add
 * @param {THREE.Vector2} direction Dorection of Cells to travel
 * @param {Array}         sizeRange range of Cell sizes
 * @param {OBJECT_TYPE}   type      Type of Cells to add
 * @param {Array}         liveRange min and max values for live duration of cells
 */
function addRandom(max, min, count, direction, sizeRange, type, liveRange){
	var res = [];
	for (var i = 0; i <= count; i++){
		var dir = direction || v2(t3.Math.randFloat() * t3.Math.randFloat(1, 20), t3.Math.randFloat() * t3.Math.randFloat(1, 20));
		res.push({x:t3.Math.randInt(min.x, max.x),
				  y:t3.Math.randInt(min.y, max.y),
				  vX: dir.x, 
				  vY: dir.y,
				  radius: t3.Math.randInt(sizeRange[0], sizeRange[1]), 
				  type: type, 
				  deathTime: t3.Math.randInt(liveRange[0], liveRange[1])
		});
	}
	cellsDemo.addNonCellBatch(res);
}

/**
 * Changes the Effect of Cells added through movement in front of cam
 * @param {THREE.Vector2} maxDirection Direction of Cells to travel
 * @param {Array}         sizeRange min and max sizes of new Cells
 * @param {OBJECT_TYPE}   type      Types of Cells to add
 * @param {Array}         liveRange min and max time for Cells to live
 */
function changeMovementEffect(maxDirection, sizeRange, type, liveRange){
	EFFECT_DIRECTION = v2(t3.Math.randInt(-5, 5), t3.Math.randInt(-5, 5));
	EFFECT_LIVE = t3.Math.randInt(10, 50);
	EFFECT_TYPE = t3.Math.randInt(0, 7);
	EFFECT_SIZE = t3.Math.randInt(10, 50);
	
	window.setTimeout(function(){
		changeMovementEffect();
	}, t3.Math.randInt(5000, 15000));
}