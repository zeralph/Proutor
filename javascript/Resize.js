"use strict"
var Resize = function( proutor )
{
	this.m_proutor = proutor;
	this.m_isDragging = false; //This gets a value as soon as a resize start
	this.startW = 0;
	this.startX = 0;
	this.test = proutor;
	console.log("test A : "+this.test);
};

Resize.prototype.doDown = function(event) 
{
	var target = event.target || event.srcElement;
	if(target.id == 'cesure' )
	{
		console.log(" dragging true "+target.id );
		Resize.m_isDragging = true;
		var div = document.getElementById('cesure');
		var bwidth = div.style.left.slice(0, -2);
		Resize.startW = bwidth;
		Resize.startX = event.screenX;
	}
};

Resize.prototype.doUp = function(event) 
{
	//console.log(" dragging false " );
	this.m_isDragging = false;
};

Resize.prototype.doMove = function(event) 
{
	//bwidth = parseInt(bwidth);
	//console.log( event.clientX );
	
	if( this.m_isDragging === false )
	{
		//console.log("dragging false" );
		return;
	}
	/*
	var w = Proutor.getPageDimensions().w;
	if( navigator.userAgent.search("Firefox") > -1 && true)
	{
		var x = w + event.screenX;
	}	
	else
	{
		var x = event.clientX;
	}
	//var x = w + event.clientX;
	//var x = event.clientX;
	//var x = event.screenX - Resize.startX + Resize.startW;
	*/
	//console.log(this.m_proutor);
	var w = this.m_proutor.getPageDimensions().w;
	var x = event.screenX - this.startX + this.startW;
	x = event.clientX;
	console.log("x is "+x);
	
	if(x<175) x=175;
	if(x>(w-100)) x=(w-100);
	
	div = document.getElementById('browser');
	div.style.width = x+"px"; 
	div = document.getElementById('cesure');
	div.style.left = x+"px";
	div = document.getElementById('search');
	div.style.width = x+"px";
	div = document.getElementById('editor');
	div.style.left = (x + 10)+"px";
	div.style.width = (w - x -10)+"px";
	Tabs.ResizeTabs();
	event.returnValue = false;
	event.cancelBubble = true;
};



