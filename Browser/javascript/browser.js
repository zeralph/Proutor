function Browser()
{

}
	Browser.startFolder = "/var/www";
	Browser.m_Tree = null;
	Browser.m_ParetnDiv = null;
	Browser.m_fullPath = null;

	Browser.init = function( parentDivId, fullPath )
	{
		Browser.m_ParetnDiv = document.getElementById(parentDivId);
		Browser.m_fullPath = fullPath;
		Browser.createFirstDiv();
	}
	
	Browser.Update = function( data, path )
	{
		var mainFolder  = data[0]['folder'];
		var mainFolderName = data[0]['name'];
		if( Browser.m_Tree == null )
		{
			Browser.m_Tree = data;
		}
		else
		{
			
		}
		Browser.Merge( data, path );
		
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
	
	Browser.requestPathContent = function( path, div ) 
	{
		Proutor.setLoading( true );
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
	
		xhr_object.open("POST", Browser.m_fullPath+"getPathContent.php", true); 
	
		xhr_object.onreadystatechange = function() 
		{ 
			if(xhr_object.readyState == 4) 
			{
				var data = JSON.parse( xhr_object.responseText );
				Browser.Update( data, path );
				if( div )
				{
					Browser.ShowDiv( div );
				}
				Proutor.setLoading( false );
			}
		} 
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		var data = "path="+encodeURIComponent( path ); 
		xhr_object.send(data); 
	}
	
	Browser.Merge = function( data, path )
	{
		var split = path;
		split = split.replace(Browser.startFolder, "");
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
					Browser.m_Tree[split[1]] = data;
					break;
				}
				case 2:
				{
					Browser.m_Tree[split[1]][split[2]] = data;
					break;
				}
				case 3:
				{
					Browser.m_Tree[split[1]][split[2]] = data;
					break;
				}
				case 4:
				{
					Browser.m_Tree[split[1]][split[2]][split[3]] = data;
					break;
				}
				case 5:
				{
					Browser.m_Tree[split[1]][split[2]][split[3]][split[4]] = data;
					break;
				}
				case 6:
				{
					Browser.m_Tree[split[1]][split[2]][split[3]][split[4]][split[5]] = data;
					break;
				}
				default:
				{
					alert("non gere");
				}
		}
	}
	
	Browser.CreateDivEmpty = function( parentDiv )
	{
		var div = document.createElement('div');
		div.className = "emptyDiv";
		div.innerHTML = 'empty';
		parentDiv.appendChild(div);
	}
	
	Browser.CreateDivFolder = function( data, parentDiv )
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
		div.onclick = function(e) { Browser.explore( e, this ); };
		div.setAttribute("data-type", "folder");
		div.setAttribute("data-status", "close");
		div.innerHTML = '<img src="'+Browser.m_fullPath+'data/folder.png" height="16">'+folderName;// + " - " + data.size;
		if( bToAppend )
		{
			parentDiv.appendChild(div);
		}
	}
	
	Browser.openFile = function(e, div )
	{
		e.stopPropagation();
		path = div.id;
		var elem =document.getElementById("editorObject");
		Tabs.addNewTab(null, path, div.getAttribute("filename"), true );
	}	
	
	Browser.explore = function(e, div )
	{
		e.stopPropagation();
		var type = div.getAttribute("data-type");
		if( type == "folder" )	
		{
			var status = div.getAttribute("data-status");
			if( status == "close" )
			{
				path = div.id;
				this.requestPathContent(path, div );
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
	
	Browser.CreateDivFile = function( data, parentDiv )
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
		div.onclick = function(e) { Browser.openFile(e, this); };
		div.setAttribute("data-type", "file");
		div.setAttribute("data-status", "none");
		div.setAttribute("filename", fileName);
		div.innerHTML = '<img src="'+Browser.m_fullPath+'data/file.png" height="16">'+fileName;// + " - " + data.size;
		if( bToAppend )
		{
			parentDiv.appendChild(div);
		}
	}
	
	Browser.createFirstDiv = function()
	{
		var div = document.createElement('div');
		div.id = Browser.startFolder;
		div.className = "rootDiv";
		div.onclick = function(e) { Browser.explore( e, this ); };
		div.setAttribute("data-type", "folder");
		div.setAttribute("data-status", "close");
		div.innerHTML = '<img src="'+Browser.m_fullPath+'data/home.png" height="16">'+Browser.startFolder;
		div.style.height = '600px'; 
		div.style.cursor = "default";
		Browser.m_ParetnDiv.appendChild(div);
	}
	
	Browser.HideDiv = function( div )
	{
		var divContent = document.getElementById( div.id+"_content" );
		divContent.style.display='none';
		div.setAttribute("data-status", "close");
	}
	
	Browser.ShowDiv = function( div )
	{
		var divContent = document.getElementById( div.id+"_content" );
		divContent.style.display='block';
		div.setAttribute("data-status", "open");
	}
	
	Browser.drawTree = function( tree )
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

