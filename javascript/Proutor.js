"use strict"
var Proutor = function()
{
	this.m_overlayLoadingRefCount = 0;
	this.m_showSearch = false;
	this.m_tabs = null;
	this.m_browser = null;
	this.m_parameters = null;
}


Proutor.prototype.getTabs = function()
{
	return this.m_tabs;
}

Proutor.prototype.SetBottombarText = function( text )
{
	document.getElementById('bottombar').innerHTML = text;
}

Proutor.prototype.setLoading = function( isLoading )
{
	if( isLoading )
	{
		Proutor.m_overlayLoadingRefCount ++;		
	}
	else
	{
		Proutor.m_overlayLoadingRefCount --;
	}
	if( Proutor.m_overlayLoadingRefCount < 0 )
	{	
		alert("refcount error" );
		Proutor.m_overlayLoadingRefCount = 0;
	}
	if( Proutor.m_overlayLoadingRefCount > 0 )
	{	
		document.getElementById("overlay").style.display = "block";
	}
	else
	{
		document.getElementById("overlay").style.display = "none";
	}
}

Proutor.prototype.removeTab = function( name, confirm )
{
	this.m_tabs.removeTab( name, confirm );
}

Proutor.prototype.onKeyPress = function( e )
{
	if ( (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) 
	{
		//save
		if( e.keyCode == 83 )
		{
			if( this.m_tabs.m_currentEditor != null )
			{
				this.m_tabs.m_currentEditor.saveFileContent();
			}
			e.preventDefault();
			return false;
		}
		//search
		if( e.keyCode == 70 )
		{
			Proutor.showSearch( !Proutor.m_showSearch );
			e.preventDefault();
			return false;
		}
	}
	if( this.m_tabs.m_currentEditor != null )
	{
		this.m_tabs.m_currentEditor.onKeyPress( e );
	}
	return true;
}

Proutor.prototype.getPageDimensions = function() 
{
	var winW = 630;
	var winH = 460;
	if (document.body && document.body.offsetWidth) 
	{
	 winW = document.body.offsetWidth;
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) 
	{
	 winW = document.documentElement.offsetWidth;
	 winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) 
	{
	 winW = window.innerWidth;
	 winH = window.innerHeight;
	}
	return { w:winW, h:winH };
}

Proutor.prototype.showSearch = function( bShow )
{
	Proutor.m_showSearch = bShow;
	if( bShow )
	{
		document.getElementById("search").style.display = "block";
	}
	else
	{
		document.getElementById("search").style.display = "none";
	}
}

Proutor.prototype.GetParameters = function()
{
	return this.m_parameters;
}

Proutor.prototype.onLoad = function()
{
	this.m_browser = new Browser( this );
	this.m_parameters = new Parameters();
	this.m_tabs = new TabList( this );
	
	this.m_browser.init("browser", "/private/Proutor/Browser/");
	this.m_tabs.init("editor","/private/Proutor/Tabs/");
	this.onResize();
	document.getElementById("overlay").style.display = "none";
	this.showSearch( false );
}

Proutor.prototype.onResize = function()
{
	var height = this.getPageDimensions().h;
	document.getElementById('browser').style.height = (height - 50) + "px";
	document.getElementById('editor').style.height = (height - 50) + "px";
	document.getElementById('cesure').style.height = (height - 50) + "px";
	document.getElementById('bottombar').style.top = (height - 50) + "px";
	document.getElementById('search').style.top = (height - 225) + "px";
	//Tabs.Resize( height );
	this.m_tabs.ResizeTabs();
}

Proutor.prototype.changeSyntax = function( language )
{
	if( this.m_tabs.m_currentEditor !== null )
	{
		this.m_tabs.m_currentEditor.setLanguage( language );
	}
}

Proutor.prototype.changeEditorStyle = function(style)
{
	this.m_tabs.UpdateStyle( style );
}

Proutor.prototype.onUnload = function()
{
}


