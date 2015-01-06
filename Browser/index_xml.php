i<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
	</head>
	<script type="text/javascript">

		var mXmlView;

		function requestPathContent( path )
		{
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

			xhr_object.open("POST", "getPathContent.php", true); 

			xhr_object.onreadystatechange = function() 
			{ 
				if(xhr_object.readyState == 4) 
				{
					alert(xhr_object.responseText);
					merge( xhr_object.responseXML, path ); 
				}
			} 
			xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
			var data = "path="+encodeURIComponent( path ); 
			xhr_object.send(data); 
		}


		//--------------------------------------------------
		//--------------------------------------------------
		//--------------------------------------------------
		//--------------------------------------------------
		//--------------------------------------------------


		function GetElementsByAttribute(node, tag, attr, attrValue) 
		{
			var elem = node.getElementsByTagName(tag);
			var elems = elem.length;
			//console.log( "[seaching]  "+attrValue+"");
			for(var i=0; i<elems; i++ )
			{
				//console.log("[seaching]   : "+i+" - "+attr+" = "+  elem[i].getAttribute(attr) );
				if( elem[i].getAttribute(attr) == attrValue )
				{
					//console.log( "[seaching]  -> found : "+ elem[i].getAttribute("name"));
					return elem[i];
				}
			}
			//console.log( "[seaching]   -> not found");
			return null;
		}	

		function merge( xml, path )
		{
			var racine = xml.documentElement;
			var mainFolder  = GetElementsByAttribute(racine, "Folder", "fullpath", path);
			var mainFolderName = mainFolder.getAttribute("name");
			//console.log(" main folder name : "+mainFolderName );
			if( mXmlView == undefined )
			{
				//console.log("mXmlView is undef, setting");
				var parser = new DOMParser();
        		mXmlView = parser.parseFromString('<explorer></explorer>', "application/xml");
				var explorer = mXmlView.getElementsByTagName( "explorer" );
				explorer[0].appendChild( racine );

			}
			else
			{
				var newNode  = mainFolder;
				var oldNode  = GetElementsByAttribute(mXmlView, "Folder", "fullpath", path);
				oldNode.parentNode.replaceChild( newNode, oldNode );
			}
			var mainDiv = document.getElementById(mainFolderName);
			var elem = mainFolder.getElementsByTagName("Folder");
			var elems = elem.length;
			//console.log("adding "+elems+" folders");
			//folders
			for( var i=0; i<elems; i++ )
			{

				var fullpath = elem[i].getAttribute("fullpath");
				var folderName = elem[i].getAttribute("name");
				var div = document.getElementById(fullpath );
				var status = "close";
				if( div != null )
				{
					div.parentNode.removeChild(div);
				}
				div = document.createElement('div');
				div.id = fullpath;
				div.className = "rootDiv";
				div.onclick = function(e) { explore(e, this); };
				div.setAttribute("data-type", "folder");
				div.setAttribute("data-status", "close");
				div.innerHTML = folderName;
				mainDiv.appendChild(div);
			}
			//files
			elem = mainFolder.getElementsByTagName("File");
			elems = elem.length;
			//console.log("adding "+elems+" files");
			for( var i=0; i<elems; i++ )
			{

				var fullpath = elem[i].getAttribute("fullpath");
				var fileName = elem[i].getAttribute("name");
				var div = document.getElementById(fullpath );
				if( div != null )
				{
					div.parentNode.removeChild(div);
				}
				div = document.createElement('div');
				div.id = fullpath;
				div.className = "fileCSS";
				div.onclick = function(e) { explore(e, this); };
				div.setAttribute("data-type", "file");
				div.setAttribute("data-status", "none");
				div.innerHTML = fileName;
				mainDiv.appendChild(div);
			}
		}

		function xml_to_string(xml_node)
		{
			if (xml_node.xml)
				return xml_node.xml;
			else if (XMLSerializer)
			{
				var xml_serializer = new XMLSerializer();
				return xml_serializer.serializeToString(xml_node);
			}
			else
			{
				alert("ERROR: Extremely old browser");
				return "";
			}
		}

		function explore( e, div )
		{
			e.stopPropagation();
			var type = div.getAttribute("data-type");
			if( type == "folder" )	
			{
				var status = div.getAttribute("data-status");
				if( status == "close" )
				{
					path = div.id;
					//console.log("explore : "+path );
					requestPathContent(path);
					ShowDiv( div );
				}
				else
				{
					HideDiv( div );
				}
			}
		}

		function createFirstDiv()
		{
			//alert("createFirstDiv");
			var div = document.createElement('div');
			div.id = "/data/1to";
			div.className = "rootDiv";
			div.onclick= function(e) { explore(e, this); };
			div.setAttribute("data-type", "folder");
			div.setAttribute("data-status", "close");
			div.innerHTML = "/data/1to";
			document.body.appendChild(div);
		}

		function HideDiv( div )
		{
			var children = div.childNodes;
			console.log(" hide " + div.id+", "+children.length+" children" );
			for(var c=0; c < children.length; c++)
			{
				var cdiv = children[c];
				if( cdiv.style )
				{
					//console.log("       hide " + cdiv.id );
					cdiv.style.display='none';
    			}

			}
			div.setAttribute("data-status", "close");
		}

		function ShowDiv( div )
		{
			var children = div.childNodes;
			console.log(" show " + div.id+", "+children.length+" children" );
			for(var c=0; c < children.length; c++)
			{
				var cdiv = children[c];
				if( cdiv.style )
				{
					//console.log("       hide " + cdiv.id );
					cdiv.style.display='block';
    			}

			}
			div.setAttribute("data-status", "open");
		}

	</script>
	<style type="text/css">
       	.hiddenDiv 
		{ 
   			display: none;
			margin-left:20px;
			height: 25px;
			font-family: Arial, Helvetica, sans-serif;
		}
		.rootDiv 
		{ 

			color: #8888FF;
			margin-left:20px;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 12px;
		}
		.fileCSS 
		{ 

			color: #FF8888;
			margin-left:20px;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 12px;
		}	
    </style> 
	<body>
		un test ....
		<!-- <input type="button" class="ButtonXL" value="Exécuter l'exemple" onclick="request()" /> -->
		<script type="text/javascript">
			createFirstDiv();
			//<div id="div_/data/1to" class="rootDiv" onclick="explore('/data/1to')">
			//data/1to
		</script>
	</body>
</html>







