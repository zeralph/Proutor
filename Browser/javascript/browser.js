var Browser = function( proutor )
{
	this.m_proutor = proutor;
	this.startFolder = "/var/www";
	this.m_Tree = null;
	this.m_ParetnDiv = null;
	this.m_fullPath = null;
}


Browser.prototype.init = function( parentDivId, fullPath )
{
	this.m_ParetnDiv = document.getElementById(parentDivId);
	this.m_fullPath = fullPath;
	this.createFirstDiv();
}

Browser.prototype.Update = function( data, path )
{
	var mainFolder  = data[0]['folder'];
	var mainFolderName = data[0]['name'];
	if( this.m_Tree == null )
	{
		this.m_Tree = data;
	}
	else
	{
		
	}
	this.Merge( data, path );
	
	var mainDiv = document.getElementById(mainFolderName);
	
	var oldDivContent = document.getElementById( mainFolderName+"_content" );
	if( oldDivContent != null )
	{
		oldDivContent.parentNode.removeChild(oldDivContent);
	}
	
	var mainDivContent = document.createElement('div');
	mainDivContent.id = mainFolderName+"_content";
	mainDiv.appendChild(mainDivContent);
	var nbEntries = 0;
	for(var key in data )
	{
		var d = data[key];
		if( d.type == "folder" )
		{
			this.CreateDivFolder( d, mainDivContent );
			nbEntries++;
		}
		else if( d.type == "file" )	
		{
			this.CreateDivFile( d, mainDivContent );
			nbEntries++;
		}
	}
	if( nbEntries == 0 )
	{
		this.CreateDivEmpty( mainDivContent );
	}
}

Browser.prototype.requestPathContent = function( path, div, context ) 
{
	this.m_proutor.setLoading( true );
	var xhr_object = null; 

	if(window.XMLHttpRequest) // Firefox 
	{
		xhr_object = new XMLHttpRequest(); 
	}
	else if(window.ActiveXObject) // Internet Explorer 
	{
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP"); 
	}
	else 
	{ // XMLHttpRequest non supporté par le navigateur 
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
		return; 
	} 

	xhr_object.open("POST", this.m_fullPath+"getPathContent.php", true); 

	xhr_object.onreadystatechange = function() 
	{ 
		if(xhr_object.readyState == 4) 
		{
			var data = JSON.parse( xhr_object.responseText );
			context.Update( data, path );
			if( div )
			{
				context.ShowDiv( div );
			}
			context.m_proutor.setLoading( false );
		}
	} 
	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
	var data = "path="+encodeURIComponent( path ); 
	xhr_object.send(data); 
}

Browser.prototype.Merge = function( data, path )
{
	var split = path;
	split = split.replace(this.startFolder, "");
	var split = split.split("/");
	var l = split.length -1;

	switch( l )
	{
			case 0:
			{
				break;
			}
			case 1:
			{
				this.m_Tree[split[1]] = data;
				break;
			}
			case 2:
			{
				this.m_Tree[split[1]][split[2]] = data;
				break;
			}
			case 3:
			{
				this.m_Tree[split[1]][split[2]] = data;
				break;
			}
			case 4:
			{
				this.m_Tree[split[1]][split[2]][split[3]] = data;
				break;
			}
			case 5:
			{
				this.m_Tree[split[1]][split[2]][split[3]][split[4]] = data;
				break;
			}
			case 6:
			{
				this.m_Tree[split[1]][split[2]][split[3]][split[4]][split[5]] = data;
				break;
			}
			default:
			{
				alert("non gere");
			}
	}
}

Browser.prototype.CreateDivEmpty = function( parentDiv )
{
	var div = document.createElement('div');
	div.className = "emptyDiv";
	div.innerHTML = 'empty';
	parentDiv.appendChild(div);
}

Browser.prototype.CreateDivFolder = function( data, parentDiv )
{
	var fullpath = data.path;
	var folderName = data.name;
	var div = document.getElementById(fullpath );
	var status = "close";
	var bToAppend = false;
	if( div == null )
	{
		div = document.createElement('div');
		bToAppend = true;
	}
	div.id = fullpath;
	div.className = "dirDiv";
	var browser = this;
	div.onclick = function(e) { browser.explore(e, div ); };
	div.setAttribute("data-type", "folder");
	div.setAttribute("data-status", "close");
	div.innerHTML = '+<img src="'+this.m_fullPath+'data/folder.png" height="16">'+folderName;// + " - " + data.size;
	if( bToAppend )
	{
		parentDiv.appendChild(div);
	}
}

Browser.prototype.openFile = function(e, div )
{
	e.stopPropagation();
	path = div.id;
	var elem =document.getElementById("editorObject");
	this.m_proutor.getTabs().addNewTab(null, path, div.getAttribute("filename"), true );
}	

Browser.prototype.explore = function(e, div )
{
	e.stopPropagation();
	var type = div.getAttribute("data-type");
	if( type == "folder" )	
	{
		var status = div.getAttribute("data-status");
		if( status == "close" )
		{
			path = div.id;
			this.requestPathContent(path, div, this );
		}
		else if( status == "open" )
		{
			this.HideDiv( div );
		}
		else
		{
			console.log("no data status ! " + status);
		}
	}
}	

Browser.prototype.CreateDivFile = function( data, parentDiv )
{
	var fullpath = data.path;
	var fileName = data.name;
	var div = document.getElementById(fullpath );
	var bToAppend = false;
	if( div == null )
	{
		//div.parentNode.removeChild(div);
		div = document.createElement('div');
		bToAppend = true;
	}
	div.id = fullpath;
	div.className = "fileCSS";
	var browser = this;
	div.onclick = function(e) { browser.openFile(e, div ); };
	
	div.setAttribute("data-type", "file");
	div.setAttribute("data-status", "none");
	div.setAttribute("filename", fileName);
	div.innerHTML = '<img src="'+this.m_fullPath+'data/file.png" height="16">'+fileName;// + " - " + data.size;
	if( bToAppend )
	{
		parentDiv.appendChild(div);
	}
}

Browser.prototype.createFirstDiv = function()
{
	var div = document.createElement('div');
	div.id = this.startFolder;
	div.className = "rootDiv";
	var browser = this;
	div.onclick = function(e) { browser.explore(e, div ); };
	div.setAttribute("data-type", "folder");
	div.setAttribute("data-status", "close");
	div.innerHTML = '<img src="'+this.m_fullPath+'data/home.png" height="16">'+this.startFolder;
	div.style.height = '600px'; 
	div.style.cursor = "default";
	this.m_ParetnDiv.appendChild(div);
}

Browser.prototype.HideDiv = function( div )
{
	var divContent = document.getElementById( div.id+"_content" );
	divContent.style.display='none';
	div.setAttribute("data-status", "close");
	//div.innerHTML = '<img src="'+this.m_fullPath+'data/home.png" height="16">'+this.startFolder;
}

Browser.prototype.ShowDiv = function( div )
{
	var divContent = document.getElementById( div.id+"_content" );
	divContent.style.display='block';
	div.setAttribute("data-status", "open");
	//div.innerHTML = '<img src="'+this.m_fullPath+'data/home.png" height="16">'+this.startFolder;
}

Browser.prototype.drawTree = function( tree )
{
	if( tree != undefined )
	{
		for(var key in tree )
		{
			var d = tree[key];
			if( d != undefined )
			{
				if( d.type == "folder" )
				{
					console.log( d.path );
					this.drawTree( d );
				}
				else if( d.type =="file"  )
				{
					console.log( d.path );
				}
			}
		}
	}
}

