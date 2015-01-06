function Parameters()
{
}

	Parameters.addFileToHistory = function( file )
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
		xhr_object.open("POST", "../Parameters/parameters.php", true); 
		xhr_object.onreadystatechange = function() 
		{ 
			if(xhr_object.readyState == 4) 
			{
			}
		}
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		var data = "addFile="+encodeURIComponent( file ); 
		xhr_object.send(data); 
	}
	
	Parameters.getFileHistory = function( retFunc )
	{
		Parameters.getParameter( "openedFiles", retFunc );
	}

	Parameters.getParameter = function( paramName, retFunction )
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
		xhr_object.open("POST", "/private/Proutor/Parameters/parameters.php", true); 
		xhr_object.onreadystatechange = function() 
		{ 
			if(xhr_object.readyState == 4) 
			{
				var data = xhr_object.responseText;
				//alert(data);
				retFunction( data );
				return;
			}
		}
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		var data = "getParam="+encodeURIComponent( paramName ); 
		xhr_object.send(data); 
	}
	
	Parameters.setParameter = function( paramName, paramValue )
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
		xhr_object.open("POST", "/private/Proutor/Parameters/parameters.php", true); 
		xhr_object.onreadystatechange = function() 
		{ 
			if(xhr_object.readyState == 4) 
			{
				var data = xhr_object.responseText;
				return data;
			}
		}
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		var data = "setParam="+encodeURIComponent( paramName )+"&value="+encodeURIComponent(paramValue); 
		//console.log( data );
		xhr_object.send(data); 
	}
