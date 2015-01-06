function Tabs()
{
}
	Tabs.tabMaxWidth = 150;
	Tabs.m_tabContentList = new Object();
	Tabs.m_tabList = new Array();
	Tabs.m_ParentDiv = null;
	Tabs.m_fullPath = null;

	Tabs.m_editors = new Object();
	Tabs.m_currentEditor =null;

	Tabs.openedFiles = null;

	Tabs.init = function( parentDivId, fullPath ) 
	{
		Tabs.m_ParentDiv = parentDivId;
		Tabs.m_fullPath = fullPath;
		var myDivContent = document.createElement('div');
		myDivContent.id = "div_container_"+name;
		myDivContent.className = 'tabContent';
		myDivContent.innerHTML = '<object type="text/html" width="100%" height="100%" data="'+Tabs.m_fullPath+'homeTab.php" ></object>';
		elem = document.getElementById('tabContainer');
		elem.appendChild( myDivContent );
		var height = Proutor.getPageDimensions().h;
		myDivContent.style.height = (height-75) + "px";
		
		top.Parameters.getParameter( "openedFiles", Tabs.OnGetOpenedFiles );
		setInterval( Tabs.saveOpenedTabs, 15000 );
	}

	Tabs.OnGetOpenedFiles = function( filesArray )
	{
		console.log("OnGetOpenedFiles" );
		if( filesArray !== undefined )
		{
			
			var a = JSON.parse( filesArray );
			console.log(a);
			console.log("filesArray not null, size is "+a.length);
			for( var i=0; i<a.length; i++ )
			{
				console.log("adding "+a[i].path);
				Tabs.addNewTab( null, a[i].path, a[i].name, false );
			}
		}
		top.Parameters.getParameter( "currentEditor", function(e){console.log("current editor set to "+e);top.Tabs.showTab( null,e);} );
	}
	
	Tabs.UpdateStyle = function( style )
	{
		if( style !== undefined )
		{
			top.Parameters.setParameter( "style", style );
			Tabs.OnGetStyle( style );
		}
		else
		{
			top.Parameters.getParameter( "style", Tabs.OnGetStyle );
		}
	}
	
	Tabs.OnGetStyle = function( style )
	{
		if( style !== undefined )
		{
			for(var tab in Tabs.m_editors)
			{
				Tabs.m_editors[tab].setStyle( style );
			}
		}
	}

	Tabs.Resize = function( height)
	{
		for(var tab in Tabs.m_tabContentList)
		{
			Tabs.m_tabContentList[tab].style.height = (height -75) + "px";
		}
		for(var tab in Tabs.m_editors)
		{
			Tabs.m_editors[tab].Resize( height );
		}
		var elem = document.getElementById('tabList');
	}

	Tabs.removeTab = function( path, confirm )
	{
		console.log(" remove tab "+path+", confirm "+confirm );
		if( confirm )
		{
			if( Tabs.m_editors[path] != null )
			{
				var bIsClean = Tabs.m_editors[path].getIsClean();
				if( !bIsClean )
				{
					var r = window.confirm( "close "+path+" without saving ?");
					if (r == false) 
					{
						return;
					}
				}
			}
		}
		
		var element = document.getElementById("div_tab_"+path);
		element.parentNode.removeChild(element);
		element = document.getElementById("div_container_"+path);
		element.parentNode.removeChild(element);
		
		//show preceding tab
		var newTab = null;
		for(var tab in Tabs.m_tabContentList)
		{
			if( tab != path )
			{
				newTab = tab;
			}
		}
		if( newTab != null )
		{
			Tabs.showTab( null, newTab );
		}
		delete  Tabs.m_tabList[path];
		delete  Tabs.m_tabContentList[path];
		delete  Tabs.m_editors[path];
		Tabs.ResizeTabs();
	}

	Tabs.getNbTabs = function()
	{
		var nb = 0;
		for(var tab in Tabs.m_tabContentList)
		{
			if( tab !=null )
			{
				nb ++;
			}
		}
		return nb;
	}
	
	Tabs.ResizeTabs = function() 
	{
		var elem = document.getElementById('tabList');
		var w = elem.offsetWidth;
		var n = Tabs.getNbTabs();
		///console.log(elem.offsetWidth );
		var w = w/(n+1);
		w = Math.min(Tabs.tabMaxWidth, w );
		console.log("resize tablist "+w+", "+n);
		for(var tab in Tabs.m_tabContentList)
		{
			console.log(tab);
			Tabs.m_tabList[tab].style.width = w + "px";
		}
	}
	
	Tabs.addNewTab = function( e, path, name, bShow )
	{
		if( Tabs.m_tabList[path]!=null )
		{
			Tabs.showTab( null, path );
			return;
		}
		Tabs.addtab( name, path, bShow );
		Tabs.ResizeTabs();
		var height = Proutor.getPageDimensions().h;
		Tabs.Resize( height );
	}

	Tabs.saveOpenedTabs = function()
	{
		//console.log("save tabs");
		Tabs.openedFiles = new Array();
		for(var tab in Tabs.m_editors)
		{
			var editor = Tabs.m_editors[tab];
			var o = new Object();
			o.path = editor.m_curFile;
			o.name = editor.m_curFileName;
			//console.log("---> saving "+o.name);
			Tabs.openedFiles.push( o );
		}
		top.Parameters.setParameter( "openedFiles", JSON.stringify(Tabs.openedFiles) );
		top.Parameters.setParameter( "currentEditor", Tabs.m_currentEditor.m_curFile );
	}
	
	Tabs.addtab = function( name, path, bShow )
	{
		console.log("adding tab "+name);
		var elem = document.getElementById('tabList');
		var myDiv = document.createElement('div');
		myDiv.id = "div_tab_"+path;
		myDiv.className = "tab";
		myDiv.setAttribute("name", name );
		myDiv.setAttribute("path", path );
		myDiv.onclick= function(e) { Tabs.showTab(e, path); };
		var href = "\"javascript:Tabs.removeTab('"+path+"', true)\"";
		var removeLink = "<a  href="+href+" >X</a>";
		myDiv.innerHTML = "&nbsp;"+name+"&nbsp;"+ removeLink;
		myDiv.style.cursor = "default";
		elem.appendChild(myDiv);
		var myDivContent = document.createElement('div');
		myDivContent.id = "div_container_"+path;
		myDivContent.className = 'tabContent';
		myDivContent.setAttribute("path", path );
		var url = Tabs.m_fullPath+"../Editor/editor.php?file="+path+"&name="+name;
		if( bShow )
		{
			url += "&show=1";
			console.log("BHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
		}
		myDivContent.innerHTML = '<object type="text/html" width="100%" height="100%" data="'+url+'" ></object>';
		elem = document.getElementById('tabContainer');
		elem.appendChild( myDivContent );
		Tabs.m_tabContentList[path] = myDivContent;
		Tabs.m_tabList[path] = myDiv;
	}

	Tabs.showTab = function( e, path ) 
	{
		if( e != null )
		{
			e.stopPropagation();
		}
		for(var tab in Tabs.m_tabContentList)
		{
			Tabs.m_tabContentList[tab].style.zIndex= (0);
			Tabs.m_tabList[tab].className = 'tab';
		}
		Tabs.m_tabContentList[path].style.zIndex = (100);
		Tabs.m_tabList[path].className = 'tab selected'
		Tabs.m_currentEditor = Tabs.m_editors[path];
		return false;
	}
			

	Tabs.listTabs = function()
	{
		console.log("show tab");
		for(var tab in Tabs.m_tabContentList)
		{
			console.log(tab);
		}
		console.log("---------");
	}














