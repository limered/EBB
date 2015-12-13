var camera = new Camera(v3(0, 0, 1000));

var pi = Math.PI;

var p1 = v2(-300, -200);
var p2 = v2(300, 200);

var lineChorio = []

var startTime = 0;
var endTime = 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(0, 0, 400, 0)], camera, "linear", null),
		new LinePath([startTime, startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.0, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(0, 0, 400, 0)], camera, "linear", null),
		new LinePath([startTime, startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.0, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, 0), v4(0, 0, 300, 0)], camera, "linear", null),
		new LinePath([startTime, startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.0, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime, startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.0, 'normal'))
	);
//Lead Einsatz
startTime = endTime; endTime += 2250;
p1.set(-500, -300);
p2.set(600, 300);

lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.05, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.075, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.1, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.15, 'normal'))
	);
//18sec
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.2, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.25, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.3, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(0, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.5, 'normal'))
	);
startTime = endTime; endTime += 2250;
p1.set(-400, -200);
p2.set(600, 500);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(100, 100, 250, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.3, 'normal'))
	);
startTime = endTime; endTime += 2250;
p1.set(-400, -400);
p2.set(500, 400);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(100, -50, 300, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.3, 'normal'))
	);
startTime = endTime; endTime += 2250;
p1.set(-400, -400);
p2.set(700, 400);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(100, -100, 270, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.3, 'normal'))
	);
startTime = endTime; endTime += 2250;
p1.set(-400, -400);
p2.set(700, 400);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 250, 0), v4(-100, 100, 230, 0)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.3, 'normal'))
	);
//36sec Atmochange --> Cam Turning
startTime = endTime; endTime += 2250;
p1.set(-400, -400);
p2.set(700, 400);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, 0), v4(0, 0, 300, pi*0.1)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.3, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, pi*0.1), v4(50, -50, 300, -pi*0.2)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 100, false, 0.3, 'normal'))
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(50, -50, 300, -pi*0.1), v4(-50, -50, 320, pi*0.1)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.3, 'normal'),
		true)
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 320, 0.0), v4(0, 0, 250, pi*0.3)], camera, "linear", null),
		new LinePath([startTime,  startTime+750], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 0.3, 'normal'),
		false)
	);
//45sec --> Lines
startTime = 45000;
endTime = 47250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, 0.0), v4(100, 100, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-500], LinePath.LINE, [v2(-500, -200), v2(500, 200)], 50, false, 1.0, 'normal'),
		false)
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, 0.0), v4(-100, -100, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-500], LinePath.LINE, [v2(500, -200), v2(-500, 200)], 50, false, 1.0, 'normal'),
		false)
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, 0.0), v4(-100, 0, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.LINE, [v2(500, 0), v2(-500, 0)], 50, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(100, 0, 300, 0.0), v4(-100, 50, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.LINE, [v2(0, -400), v2(0, 400)], 50, false, 1.0, 'normal'),
		false)
	);
//54sec multiple Lines
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(500, -100, 300, 0.0), v4(400, -50, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-250], LinePath.BSPLINE_OPEN, [v2(-500, -300), v2(500, -300), v3(500, 300)], 50, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(-400, 150, 400, 0.0), v4(300, 100, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-250], LinePath.BSPLINE_OPEN, [v2(500, 300), v2(-500, 300), v3(-500, -300)], 50, false, 1.0, 'normal'),
		true)
	);
p1.set(-500, -300);
p2.set(0, 300);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(-250, 50, 300, 0.0), v4(-150, 100, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-250], LinePath.RANDOM, [p1.clone(), p2.clone()], 20, false, 1.0, 'normal'),
		true)
	);
p1.set(0, -300);
p2.set(500, 300);
startTime = endTime; endTime += 2250;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(250, 100, 300, 0), v4(150, 150, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-250], LinePath.RANDOM, [p1.clone(), p2.clone()], 20, false, 1.0, 'normal'),
		false)
	);
//63sec Linie Verfolgen
startTime = endTime; endTime += 2250;
p1.set(t3.Math.randInt(-1000, -300), t3.Math.randInt(-100, 100));
p2.set(t3.Math.randInt(300, 1000), t3.Math.randInt(-100, 100));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p1.x, p1.y, 300, 0), v4(p2.x, p2.y, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.LINE, [p1.clone(), p2.clone()], 20, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 2250;
var p3 = v2((p1.x * 0.85 + p2.x * 0.15), t3.Math.randInt(100, 200));
var p4 = v2((p1.x * 0.5 + p2.x * 0.5), t3.Math.randInt(-100, -200));
var p5 = v2((p1.x * 0.15 + p2.x * 0.85), t3.Math.randInt(100, 200));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p3.x, p3.y, 300, 0), v4(300, 0, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.BSPLINE_OPEN, [p1.clone(),p3.clone(), p4.clone(), p5.clone(), p2.clone()], 50, false, 1.0, 'normal'),
		true)
	);

startTime = endTime; endTime += 2250;
p1.set(t3.Math.randInt(-100, 100), t3.Math.randInt(-1000, -300));
p2.set(t3.Math.randInt(-100, 100), t3.Math.randInt(300, 1000));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p1.x, p1.y, 300, 0), v4(p2.x, p2.y, 300, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.LINE, [p1.clone(), p2.clone()], 20, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 2250;
var p3 = v2(t3.Math.randInt(100, 200), (p1.y * 0.85 + p2.y * 0.15));
var p4 = v2(t3.Math.randInt(-100, -200), (p1.y * 0.5 + p2.y * 0.5));
var p5 = v2(t3.Math.randInt(100, 200), (p1.y * 0.15 + p2.y * 0.85));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, 0), v4(0, 0, 450, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.BSPLINE_OPEN, [p1.clone(),p3.clone(), p4.clone(), p5.clone(), p2.clone()], 50, false, 1.0, 'normal'),
		false)
	);
//72sec
startTime = endTime; endTime += 2250;
p1.set(-1000, 10000-800);
p2 = v2(0, 10000)
p3 = v2(1000, 10000-800);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 100, 0), v4(0, 10000, 300, pi*0.5)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.BSPLINE_OPEN, [p1.clone(), p2.clone(), p3.clone()], 50, false, 0.3, 'normal'),
		true)
	);
startTime = endTime; endTime += 2250;
p1.set(-1000, 10000+800);
p3.set(1000, 10000+800);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 300, pi*0.5), v4(0, 10000, 350, pi*0.8)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.BSPLINE_OPEN, [p1.clone(), p2.clone(), p3.clone()], 50, false, 0.3, 'normal'),
		true)
	);

startTime = endTime; endTime += 2250;
p1.set(0, 10000);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 350, pi*0.8), v4(0, 10000, 380, pi*0.9)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.POINT, [p1.clone(), p2.clone()], 50, false, 0.3, 'normal'),
		true)
	);

startTime = endTime; endTime += 2250;
p1.set(0, 10000);
p2.set(0, 10000-3000);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, startTime+1000, endTime], [v4(0, 10000, 380, pi*0.9), v4(0, 10000-1000, 300, pi*0.95), v4(0, -3100, 150, pi)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.LINE, [p1.clone(), p2.clone()], 100, false, 0.3, 'normal'),
		false)
	);
//81sec - Interlude
startTime = endTime; endTime += 2250;

p1.set(0, -600);
p2.set(200, 400);

p3 = v2(-100, p1.y * 0.75 + p2.y * 0.25);
p4 = v2(-75, p1.y * 0.5 + p2.y * 0.5);
p5 = v2(0, p1.y * 0.25 + p2.y * 0.75);
lineChorio.push(
	new LineScene(startTime, startTime + 1500,
		new CameraEffect([startTime, startTime + 1000], [v4(p1.x, -400, 300, 0), v4(p2.x, p2.y, 300, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 1500], LinePath.BSPLINE_OPEN, [p1.clone(), p3.clone(), p4.clone(), p5.clone(), p2.clone()], 100, false, 1.0, 'slow'),
		true)
	);
p1 = v2(p2.x - 200, p2.y - 200);
p3 = v2(p2.x + 200, p2.y + 200);
lineChorio.push(
	new LineScene(startTime + 1500, 84000,
		new CameraEffect([startTime + 1500, endTime], [v4(p2.x, p2.y, 300, 0), v4(p2.x, p2.y, 300, 0)], camera, "linear", null),
		new LinePath([startTime + 1500, startTime + 1600], LinePath.RANDOM, [p1.clone(), p3.clone()], 100, false, 1.0, 'slow'),
		true)
	);

//BreakDown
startTime = 84000; 
endTime = 87000;
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p2.x, p2.y, 300, 0), v4(p2.x, p2.y, 500, -pi*0.3)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p3.clone()], 2, false, 1.0, 'slow'),
		true)
	);
// 4 explosionen
startTime = 87000;
endTime = startTime + 1500;
p1 = v2(-600, 400);
p2 = v2(600, 400);
p3 = v2(600, -400);
p4 = v2(-600, -400);
times = [startTime, startTime+375, startTime+(374*2), startTime+(375*3), startTime+(375*4)];
lineChorio.push(
	new LineScene(times[0], times[1],
		new CameraEffect([times[0], times[1]], [v4(p1.x, p1.y, 350, 0), v4(p1.x, p1.y, 350, 0)], camera, "linear", null),
		new LinePath([times[0], times[1]], LinePath.POINT, [p1.clone()], 20, false, 1.0, 'fast'),
		true)
	);

lineChorio.push(
	new LineScene(times[1], times[2],
		new CameraEffect([times[1], times[2]], [v4(p2.x, p2.y, 350, 0), v4(p2.x, p2.y, 350, 0)], camera, "linear", null),
		new LinePath([times[1], times[2]], LinePath.POINT, [p2.clone()], 20, false, 1.0, 'fast'),
		true)
	);
lineChorio.push(
	new LineScene(times[2], times[3],
		new CameraEffect([times[2], times[3]], [v4(p3.x, p3.y, 350, 0), v4(p3.x, p3.y, 350, 0)], camera, "linear", null),
		new LinePath([times[2], times[3]], LinePath.POINT, [p3.clone()], 20, false, 1.0, 'fast'),
		true)
	);
lineChorio.push(
	new LineScene(times[3], endTime,
		new CameraEffect([times[3], times[4], endTime], [v4(p4.x, p4.y, 350, 0), v4(p4.x, p4.y, 350, 0), v4(0, 400, 550, 0)], camera, "linear", null),
		new LinePath([times[3], times[4]], LinePath.POINT, [p4.clone()], 20, false, 1.0, 'fast'),
		true)
	);
//4 Cam Fahrten
startTime = endTime; endTime += 1500;
p1 = v2(-200, 250);
p2 = v2(0, 400);
c1 = v2(-100, 325);
c2 = v2(c1.x - 50, c1.y + 50);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 400, 0), v4(c2.x, c2.y, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p3.clone()], 20, false, 0.0, 'fast'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(200, 250);
p2 = v2(400, 400);
c1 = v2(300, 325);
c2 = v2(c1.x + 50, c1.y - 100);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 400, 0), v4(c2.x, c2.y, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p3.clone()], 20, false, 0.0, 'fast'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(400, 350);
p2 = v2(550, 200);
c1 = v2(p1.x, p1.y);
c2 = v2(c1.x - 50, c1.y + 50);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 400, 0), v4(c2.x, c2.y, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p3.clone()], 20, false, 0.0, 'fast'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(-200, 450);
p2 = v2(0, 650);
c1 = v2(-100, 450);
c2 = v2(-100, 550);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 400, 0), v4(c2.x, c2.y, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p3.clone()], 20, false, 0.0, 'fast'),
		true)
	);
//pfeile - BreakDown
startTime = endTime; endTime += 1500;
p1 = v2(-1500, 600);
p3 = v2(0, 400);
p2 = v2(p1.x*0.5 + p2.x*0.5, 1000);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p1.x, p1.y, 400, 0), v4(p3.x+200, p3.y, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-500], LinePath.BSPLINE_OPEN, [p1.clone(), p2.clone(), p3.clone()], 50, false, 1.0, 'normal'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(1500, -3500);
p3 = v2(0, 400);
p2 = v2(p1.x*0.5 + p2.x*0.5, -2500);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p1.x, p1.y, 550, 0), v4(p3.x+200, p3.y, 550, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-500], LinePath.BSPLINE_OPEN, [p1.clone(), p2.clone(), p3.clone()], 50, false, 1.0, 'normal'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(1500, 1500);
p3 = v2(0, 400);
p2 = v2(p1.x*0.5 + p2.x*0.5, 500);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(p1.x, p1.y, 400, 0), v4(p3.x, p3.y-200, 550, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-500], LinePath.BSPLINE_OPEN, [p1.clone(), p2.clone(), p3.clone()], 50, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 1500;
pStart = v2(1500, -400);
p1 = v2(1000, 400);
pMiddle = v2(350, -400);
p2 = v2(0, 400);
p3 = v2(-750, -400);
pEnd = v2(-1500, 400);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(pStart.x, pStart.y, 600, 0), v4(0, 0, 700, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [pStart.clone(), p1.clone(), pMiddle.clone(), p2.clone(), p3.clone(), pEnd.clone()], 100, false, 1.0, 'normal'),
		true)
	);
//cam bewegung
startTime = endTime; endTime += 1500;
p1 = v2(-1000, 400);
p2 = v2(-500, 0);
c1 = v2((p1.x + p2.x)/2, (p1.y + p2.y)/2);
c2 = v2(c1.x + 200, c1.y - 100);

lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 200, 0), v4(c2.x, c2.y, 250, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 30, false, 1.0, 'fast'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(200, -250);
p2 = v2(400, -400);
c1 = v2(p1.x*0.5 + p2.x*0.5, p1.y*0.5 + p2.y*0.5);
c2 = v2(c1.x - 200, c1.y + 100);

lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 250, 0), v4(c2.x, c2.y, 200, pi*-0.1)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 20, false, 1.0, 'fast'),
		true)
	);

startTime = endTime; endTime += 1500;
p1 = v2(400, -350);
p2 = v2(550, -200);
c1 = v2(p1.x, p1.y);
c2 = v2(c1.x - 50, c1.y - 50);

lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c1.x, c1.y, 200, pi*-0.1), v4(c2.x, c2.y, 500, pi*0.1)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 20, false, 1.0, 'fast'),
		true)
	);
//kreis -> flug
startTime = endTime; endTime += 1500;
p1 = v2(-700, 600);
c1 = v2(t3.Math.randInt(-700, 700), t3.Math.randInt(-200, 700));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(c2.x, c2.y, 500, pi*0.1), v4(0, 400, 850, pi*0.2)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.POINT, [p1.clone()], 10, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 1500;
p1 = v2(0, 350);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 400, 850, pi*0.2), v4(c1.x, c1.y, -100, pi*0.6)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.POINT, [p1.clone()], 10, false, 1.0, 'normal'),
		false)
	);
//108 sec -> normal
startTime = endTime; endTime += 1125;
p1 = v2(-500, 0);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(-400, 0, 50, 0), v4(0, 0, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime-500], LinePath.POINT, [p1.clone()], 30, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 1875;
p1 = v2(500, 0);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(400, 0, -20, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.POINT, [p1.clone()], 30, false, 1.0, 'normal'),
		false)
	);

startTime = endTime; endTime += 1500;
p1 = v2(-500, 10000);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(-400, 10000, -20, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.POINT, [p1.clone()], 30, false, 1.0, 'normal'),
		false)
	);
startTime = endTime; endTime += 1500;
p1 = v2(-500, 0);
p2 = v2(p1.x, p1.y-50);
p3 = v2(p1.x, p1.y+50);
p4 = v2(p1.x-50, p1.y);
p5 = v2(p1.x+50, p1.y);

lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(-525, 25, -20, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.BSPLINE_OPEN, [p2.clone(), p3.clone(), p4.clone(), p5.clone()], 50, false, 1.0, 'slow'),
		false)
	);

startTime = endTime; endTime += 1000;
p1 = v2(800, 10000-200);
p2 = v2(400, 10000+200);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(500, 10000, -20, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.RANDOM, [p1.clone(), p2.clone()], 30, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 1000;
p1 = v2(-800, 200);
p2 = v2(-400, -200);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(-500, 0, -20, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.RANDOM, [p1.clone(), p2.clone()], 30, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 1000;
p1 = v2(-200, 10000-200);
p2 = v2(200, 10000+200);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(0, 10000, -20, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.RANDOM, [p1.clone(), p2.clone()], 30, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 3000;
p1 = v2(-800, -500);
p2 = v2(800, 600);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(-300, 0, 200, 0), v4(300, 0, 200, 0)], camera, "linear", null),
		new LinePath([startTime, startTime + 500], LinePath.RANDOM, [p1.clone(), p2.clone()], 200, false, 1.0, 'normal'),
		false)
	);
//120 sec
startTime = endTime; endTime += 3000;
p1 = v2(500, 10000 + 700);
p2 = v2(500, 10000 - 700);
p3 = v2(1000, 10000 + 700);
p4 = v2(1000, 10000 - 700);
p5 = v2(2000, 10000 + 700);
p6 = v2(2500, 10000 - 700);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(1600, 10000, 400, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [p1.clone(), p2.clone(), p3.clone(), p4.clone(), p5.clone(), p6.clone()], 300, false, 1.0, 'normal'),
		false)
	);
startTime = endTime; endTime += 500;
p1 = v2(t3.Math.randInt(0, 300), t3.Math.randInt(0, 300));
p2 = v2(t3.Math.randInt(0, 300), -t3.Math.randInt(0, 300));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(p1.x, 0, -20, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 500;
p1 = v2(t3.Math.randInt(0, 300), 10000+t3.Math.randInt(0, 300));
p2 = v2(t3.Math.randInt(0, 300), 10000-t3.Math.randInt(0, 300));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(p1.x, 10000, -20, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 500;
p1 = v2(t3.Math.randInt(0, 300), t3.Math.randInt(0, 300));
p2 = v2(t3.Math.randInt(0, 300), -t3.Math.randInt(0, 300));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(p1.x, 0, -20, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 500;
p1 = v2(t3.Math.randInt(0, 300), 10000+t3.Math.randInt(0, 300));
p2 = v2(t3.Math.randInt(0, 300), 10000-t3.Math.randInt(0, 300));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(p1.x, 10000, -20, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 500;
p1 = v2(t3.Math.randInt(0, 300), t3.Math.randInt(0, 300));
p2 = v2(t3.Math.randInt(0, 300), -t3.Math.randInt(0, 300));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 400, 0), v4(p1.x, 0, -20, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 1.0, 'fast'),
		false)
	);
startTime = endTime; endTime += 500;
p1 = v2(0, 10000+t3.Math.randInt(0, 300));
p2 = v2(0, 10000-t3.Math.randInt(0, 300));
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 10000, 400, 0), v4(p1.x, 10000, -20, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.RANDOM, [p1.clone(), p2.clone()], 50, false, 1.0, 'fast'),
		false)
	);
//Eye Prelude
startTime = endTime; endTime += 4000;
p1 = v2(-10, -10);
p2 = v2(-10, 10);
p3 = v2(10, 10);
p4 = v2(10, -10);

p5 = v2(-10, -80);
p6 = v2(-80, 80);
p7 = v2(80, 80);
p8 = v2(80, -80);

p9 = v2(-80, -160);
p10 = v2(-160, 160);
p11 = v2(160, 160);
p12 = v2(160, -160);

p13 = v2(-160, -240);
p14 = v2(-240, 240);
p15 = v2(240, 240);
p16 = v2(240, -240);

p17 = v2(-240, -320);
p18 = v2(-320, 320);
p19 = v2(320, 320);
p20 = v2(320, -320);

p21 = v2(-320, -400);
p22 = v2(-400, 400);
p23 = v2(400, 400);
p24 = v2(400, -400);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 600, 0), v4(0, 0, 200, pi*-2)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
			p21, p22, p23, p24], 150, false, 1.0, 'slow'),
		true)
	);
startTime = endTime; endTime += 2000;
p1 = v2(-10, -10);
p2 = v2(10, 10);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 200, pi*-2), v4(0, 0, -20, pi*-3)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.RANDOM, [p1, p2], 10, false, 1.0, 'normal'),
		true)
	);

//end eye
startTime = endTime; endTime += 3000;
p1 = v2(-900, 0);
p2 = v2(-400, -200);
p3 = v2(400, -200);
p4 = v2(900, 0);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(-900, 0, 350, 0), v4(900, 0, 250, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [p1, p2, p3, p4], 100, false, 1.0, 'normal'),
		true)
	);
startTime = endTime; endTime += 3000;
p1 = v2(900, 0);
p2 = v2(400, 200);
p3 = v2(-400, 200);
p4 = v2(-900, 0);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, startTime+1500, endTime], [v4(900, 0, 250, 0), v4(0, 200, 200, 0), v4(-900, 0, 200, 0)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [p1, p2, p3, p4], 100, false, 1.0, 'normal'),
		true)
	);

startTime = endTime; endTime += 3000;
p1 = v2(-10, -10);
p2 = v2(-10, 10);
p3 = v2(10, 10);
p4 = v2(10, -10);

p5 = v2(-10, -60);
p6 = v2(-60, 60);
p7 = v2(60, 60);
p8 = v2(60, -60);

p9 = v2(-80, -110);
p10 = v2(-110, 110);
p11 = v2(110, 110);
p12 = v2(110, -110);

p13 = v2(-110, -160);
p14 = v2(-160, 160);
p15 = v2(160, 160);
p16 = v2(160, -160);

p17 = v2(-160, -210);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 200, 0), v4(0, 0, 300, pi*-1)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13, p14, p15, p16, p17], 50, false, 1.0, 'fast'),
		true)
	);
startTime = endTime; endTime += 3000;
p1 = v2(-900, -300);
p2 = v2(900, 300);
lineChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, pi*-1), v4(0, 0, 350, pi*-1.05)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.RANDOM, [p1, p2], 150, false, 1.0, 'slow'),
		true)
	);