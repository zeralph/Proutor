var TabList = function( proutor )
{
	this.m_proutor = proutor;
	this.tabMaxWidth = 150;
	this.m_tabContentList = new Object();
	this.m_tabList = new Array();
	this.m_ParentDiv = null;
	this.m_fullPath = null;
	this.m_editors = new Object();
	this.m_currentEditor =null;
	this.openedFiles = null;
	this.m_intervalID = 0;
}


TabList.prototype.init = function( parentDivId, fullPath ) 
{
	this.m_ParentDiv = parentDivId;
	this.m_fullPath = fullPath;
	var myDivContent = document.createElement('div');
	myDivContent.id = "div_container_"+name;
	myDivContent.className = 'tabContent';
	myDivContent.innerHTML = '<object type="text/html" width="100%" height="100%" data="'+this.m_fullPath+'homeTab.php" ></object>';
	elem = document.getElementById('tabContainer');
	elem.appendChild( myDivContent );
	var height = this.m_proutor.getPageDimensions().h;
	myDivContent.style.height = (height-75) + "px";
	//console.log("OnGetOpenedFiles "+this.m_proutor );
	this.m_proutor.GetParameters().getParameter( "openedFiles", this, this.OnGetOpenedFiles );
	this.m_intervalID = setInterval( this.saveOpenedTabs.bind(this), 1000 );
	//this.retrieve_rate.bind(this), this.INTERVAL);
}

TabList.prototype.OnGetOpenedFiles = function( filesArray )
{
	//console.log("OnGetOpenedFiles "+this.m_proutor );
	if( filesArray !== undefined )
	{
		
		var a = JSON.parse( filesArray );
		console.log(a);
		console.log("filesArray not null, size is "+a.length);
		for( var i=0; i<a.length; i++ )
		{
			console.log("adding "+a[i].path);
			this.addNewTab( null, a[i].path, a[i].name, false );
		}
	}
	//this.m_proutor.GetParameters().getParameter( "currentEditor", function(e){console.log("current editor set to "+e);top.this.showTab( null,e);} );
}

TabList.prototype.UpdateStyle = function( style )
{
	if( style !== undefined )
	{
		this.m_proutor.GetParameters().setParameter( "style", style );
		this.OnGetStyle( style );
	}
	else
	{
		this.m_proutor.GetParameters().getParameter( "style", this.OnGetStyle );
	}
}

TabList.prototype.OnGetStyle = function( style )
{
	if( style !== undefined )
	{
		for(var tab in this.m_editors)
		{
			this.m_editors[tab].setStyle( style );
		}
	}
}

TabList.prototype.Resize = function( height)
{
	for(var tab in this.m_tabContentList)
	{
		this.m_tabContentList[tab].style.height = (height -75) + "px";
	}
	for(var tab in this.m_editors)
	{
		this.m_editors[tab].Resize( height );
	}
	var elem = document.getElementById('tabList');
}

TabList.prototype.removeTab = function( path, confirm )
{
	console.log(" remove tab "+path+", confirm "+confirm );
	if( confirm )
	{
		if( this.m_editors[path] != null )
		{
			var bIsClean = this.m_editors[path].getIsClean();
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
	for(var tab in this.m_tabContentList)
	{
		if( tab != path )
		{
			newTab = tab;
		}
	}
	if( newTab != null )
	{
		this.showTab( null, newTab );
	}
	delete  this.m_tabList[path];
	delete  this.m_tabContentList[path];
	delete  this.m_editors[path];
	this.ResizeTabs();
}

TabList.prototype.getNbTabs = function()
{
	var nb = 0;
	for(var tab in this.m_tabContentList)
	{
		if( tab !=null )
		{
			nb ++;
		}
	}
	return nb;
}

TabList.prototype.ResizeTabs = function() 
{
	var elem = document.getElementById('tabList');
	var w = elem.offsetWidth;
	var n = this.getNbTabs();
	///console.log(elem.offsetWidth );
	var w = w/(n+1);
	w = Math.min(this.tabMaxWidth, w );
	console.log("resize tablist "+w+", "+n);
	for(var tab in this.m_tabContentList)
	{
		console.log(tab);
		this.m_tabList[tab].style.width = w + "px";
	}
}

TabList.prototype.addNewTab = function( e, path, name, bShow )
{
	if( this.m_tabList[path]!=null )
	{
		this.showTab( null, path );
		return;
	}
	this.addtab( name, path, bShow );
	this.ResizeTabs();
	var height = this.m_proutor.getPageDimensions().h;
	this.Resize( height );
}

TabList.prototype.saveOpenedTabs = function()
{
	//console.log("save tabs");
	this.openedFiles = new Array();
	for(var tab in this.m_editors)
	{
		var editor = this.m_editors[tab];
		var o = new Object();
		o.path = editor.m_curFile;
		o.name = editor.m_curFileName;
		//console.log("---> saving "+o.name);
		this.openedFiles.push( o );
	}
	this.m_proutor.GetParameters().setParameter( "openedFiles", JSON.stringify(this.openedFiles) );
	if( this.m_currentEditor )
	{
		this.m_proutor.GetParameters().setParameter( "currentEditor", this.m_currentEditor.m_curFile );
	}
}

TabList.prototype.addtab = function( name, path, bShow )
{
	console.log("adding tab "+name);
	var elem = document.getElementById('tabList');
	var myDiv = document.createElement('div');
	myDiv.id = "div_tab_"+path;
	myDiv.className = "tab";
	myDiv.setAttribute("name", name );
	myDiv.setAttribute("path", path );
	var tab = this;
	myDiv.onclick= function(e) { tab.showTab(e, path); };
	myDiv.innerHTML = "&nbsp;"+name+"&nbsp;";
	myDiv.style.cursor = "default";
	
	//remove icon
	var myDivRemove = document.createElement('div');
	myDivRemove.innerHTML = "X";
	myDivRemove.onclick= function(e) { tab.removeTab(path, true); };
	myDiv.appendChild(myDivRemove);


	elem.appendChild(myDiv);
	var myDivContent = document.createElement('div');
	myDivContent.id = "div_container_"+path;
	myDivContent.className = 'tabContent';
	myDivContent.setAttribute("path", path );
	var url = this.m_fullPath+"../Editor/editor.php?file="+path+"&name="+name;
	if( bShow )
	{
		url += "&show=1";
		console.log("BHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
	}
	myDivContent.innerHTML = '<object type="text/html" width="100%" height="100%" data="'+url+'" ></object>';
	elem = document.getElementById('tabContainer');
	elem.appendChild( myDivContent );
	this.m_tabContentList[path] = myDivContent;
	this.m_tabList[path] = myDiv;
}

TabList.prototype.showTab = function( e, path ) 
{
	if( e != null )
	{
		e.stopPropagation();
	}
	for(var tab in this.m_tabContentList)
	{
		this.m_tabContentList[tab].style.zIndex= (0);
		this.m_tabList[tab].className = 'tab';
	}
	this.m_tabContentList[path].style.zIndex = (100);
	this.m_tabList[path].className = 'tab selected'
	this.m_currentEditor = this.m_editors[path];
	return false;
}
		

TabList.prototype.listTabs = function()
{
	console.log("show tab");
	for(var tab in this.m_tabContentList)
	{
		console.log(tab);
	}
	console.log("---------");
}














