function Proutor()
{
}

	Proutor.m_overlayLoadingRefCount = 0;
	Proutor.m_showSearch = false;

	Proutor.SetBottombarText = function( text )
	{
		document.getElementById('bottombar').innerHTML = text;
	}

	Proutor.setLoading = function( isLoading )
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

	Proutor.removeTab = function( name, confirm )
	{
		Tabs.removeTab( name, confirm );
	}

	Proutor.onKeyPress = function( e )
	{
		if ( (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) 
		{
			//save
			if( e.keyCode == 83 )
			{
				if( Tabs.m_currentEditor != null )
				{
					Tabs.m_currentEditor.saveFileContent();
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
		if( Tabs.m_currentEditor != null )
		{
			Tabs.m_currentEditor.onKeyPress( e );
		}
		return true;
	}

	Proutor.getPageDimensions = function() 
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

	Proutor.showSearch = function( bShow )
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

	Proutor.onLoad = function()
	{
		Browser.init("browser", "/private/Proutor/Browser/");
		Tabs.init("editor","/private/Proutor/Tabs/");
		Proutor.onResize();
		document.getElementById("overlay").style.display = "none";
		Proutor.showSearch( false );
	}
	
	Proutor.onResize = function()
	{
		var height = Proutor.getPageDimensions().h;
		document.getElementById('browser').style.height = (height - 50) + "px";
		document.getElementById('editor').style.height = (height - 50) + "px";
		document.getElementById('cesure').style.height = (height - 50) + "px";
		document.getElementById('bottombar').style.top = (height - 50) + "px";
		document.getElementById('search').style.top = (height - 225) + "px";
		//Tabs.Resize( height );
		Tabs.ResizeTabs();
	}

	Proutor.changeSyntax = function( language )
	{
		if( Tabs.m_currentEditor !== null )
		{
			Tabs.m_currentEditor.setLanguage( language );
		}
	}
	
	Proutor.changeEditorStyle = function(style)
	{
		Tabs.UpdateStyle( style );
	}

	Proutor.onUnload = function()
	{
	}


