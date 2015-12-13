// var camera = new Camera(v3(0, 0, 1000));

var pi = Math.PI;

var p1 = v2(-300, -200);
var p2 = v2(300, 200);

var startTime = 0;
var endTime = 0;

var testChorio = []
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
testChorio.push(
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
testChorio.push(
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
testChorio.push(
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
testChorio.push(
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
testChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 200, 0), v4(0, 0, 300, pi*-1)], camera, "linear", null),
		new LinePath([startTime, endTime], LinePath.BSPLINE_OPEN, [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
			p11, p12, p13, p14, p15, p16, p17], 50, false, 1.0, 'fast'),
		true)
	);
startTime = endTime; endTime += 3000;
p1 = v2(-900, -300);
p2 = v2(900, 300);
testChorio.push(
	new LineScene(startTime, endTime,
		new CameraEffect([startTime, endTime], [v4(0, 0, 300, pi*-1), v4(0, 0, 350, pi*-1.05)], camera, "linear", null),
		new LinePath([startTime, endTime-1000], LinePath.RANDOM, [p1, p2], 150, false, 1.0, 'slow'),
		true)
	);
