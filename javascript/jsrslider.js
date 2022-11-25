sketch.default2d();var val = 0.25;var width = 0.5;var vbrgb = [0.8,0.8,0.8,1.];var vfrgb = [0.3,0.3,0.3,1.];var last_x = 0;var last_y = 0;var shifted;var size_x, size_y;getsize();// process argumentsif (jsarguments.length>1) vfrgb[0] = jsarguments[1]/255.;if (jsarguments.length>2) vfrgb[1] = jsarguments[2]/255.;if (jsarguments.length>3) vfrgb[2] = jsarguments[3]/255.;if (jsarguments.length>4) vbrgb[0] = jsarguments[4]/255.;if (jsarguments.length>5) vbrgb[1] = jsarguments[5]/255.;if (jsarguments.length>6) vbrgb[2] = jsarguments[6]/255.;if (jsarguments.length>7) val = jsarguments[7];if (jsarguments.length>8) width = jsarguments[8] - val;bounds();draw();function getsize(){	size_x = this.box.rect[2] - this.box.rect[0];	size_y = this.box.rect[3] - this.box.rect[1];}function list(v1, v2){	if (v1 < v2) {		val = v1;		width = v2 - v1;	} else {		val = v2;		width = v1 - v2;	}	bang();}function draw(){	var v1 = val;	if (v1 > 0.99) v1 = 0.99;	v1 = v1 * 2. -1.;	var v2 = width;	if (v2 < 0.01) v2 = 0.01;	v2 = v2 * 2 + v1;	if (size_x > size_y) {		frac = size_x/size_y;		v1 *= frac;		v2 *= frac;	}	with (sketch) {		glclearcolor(vbrgb[0],vbrgb[1],vbrgb[2],vbrgb[3]);		glclear();							glcolor(vfrgb[0],vfrgb[1],vfrgb[2],vfrgb[3]);		if (size_x > size_y)			quad(v1, -1, 1, v2, -1, 1, v2, 1, 1, v1, 1, 1);		else			quad(-1, v1, 1, -1, v2, 1, 1,  v2, 1, 1, v1, 1);			}}function bang(){	bounds();	draw();	refresh();	outlet(0, val, val + width);	notifyclients();}function bounds(){	if (width >1.) width = 1.;	if (width < 0.) width = 0.;	if (val < 0.) val = 0.;	if (val + width > 1.) val = 1. - width;}function frgb(r,g,b){	vfrgb[0] = r/255.;	vfrgb[1] = g/255.;	vfrgb[2] = b/255.;	draw();	refresh();}function brgb(r,g,b){	vbrgb[0] = r/255.;	vbrgb[1] = g/255.;	vbrgb[2] = b/255.;	draw();	refresh();}function setvalueof(x,y){	list(x,y);}function getvalueof(){	var a = new Array(val, val + width);	return a;}function onresize(w,h){	getsize();	draw();	refresh();}function onclick(x,y,but,cmd,shift,capslock,option,ctrl){	// cache mouse position for tracking delta movements	last_x = x;	last_y = y;	shifted = shift;}function ondrag(x,y,but,cmd,shift,capslock,option,ctrl){	var dv, dw, dx, dy;		dx = x - last_x;	dy = y - last_y;	if (size_x > size_y) {		dv = val + dx / size_x + dy *  0.002;		dw = width - dy * 0.004;	} else {		dv = val - dy / size_y + dx *  0.002;		dw = width - dx * 0.004;	}	if (shifted) dw = width; 	// this should be if (shift), to check shift continuously during drag.	// however, modifier keys do not seem to work here - shift is always 0.	// hence for now we just check whether shift was down on click, which does work... 	list(dv, dv + dw);	last_x = x;	last_y = y;}function ondblclick(x,y,but,cmd,shift,capslock,option,ctrl){	list(0.,1.); }function fsaa(v){	sketch.fsaa = v;	bang();}