var Editor=function()
{
	function instance( curFile, curFileName, bShow )
	{
		this.m_curFile = curFile;
		this.m_curFileName = curFileName;
		this.m_mainPage = null; 
		this.m_curChange = undefined;
		this.m_searchCursor = null;
		this.m_searchStr = "";
		this.m_searchLoop = false;
		this.m_editor = null;
		this.m_ext = null;
		this.m_bShow = bShow;
	}
	
	instance.prototype.init = function()
	{
		this.m_editor = CodeMirror.fromTextArea(document.getElementById("code"), {
								lineNumbers: true,
								mode: "htmlmixed",
								/*theme: "night",*/
								matchBrackets: true,
								highlightSelectionMatches: {showToken: /\w/}
							});
		if( this.m_curFile.length > 0 )
		{
			//alert( "requesting "+file);
			this.requestFileContent( this, this.m_editor );
		}
		if( this.m_bShow )
		{
			top.Tabs.showTab( null, this.m_curFile);		
		}
	}
	
	instance.prototype.search = function( str, bMatchCase, bFromStart, bLoop )
	{
		var curCursor = this.m_editor.doc.getCursor();
		this.m_searchStr = str;
		this.m_searchLoop = bLoop;
		this.m_searchCursor = this.m_editor.getSearchCursor( str, curCursor, bMatchCase);
		this.nextMatch();
	}
	
	instance.prototype.nextMatch = function()
	{
		if( this.m_searchCursor != undefined )
		{
			var bFound = this.m_searchCursor.findNext();
			if( bFound )
			{
				this.m_editor.doc.setSelection( this.m_searchCursor.pos.from, this.m_searchCursor.pos.to );
				return;
			}

		}
		alert( this.m_searchStr +" not found");
	}
	
	instance.prototype.prevMatch = function()
	{
		if( this.m_searchCursor != undefined )
		{
			var bFound = this.m_searchCursor.findPrev();
			if( bFound )
			{
				this.m_editor.doc.setSelection( this.m_searchCursor.pos.from, this.m_searchCursor.pos.to );
				return;
			}
		}
		alert( m_searchStr +" not found");
	}
	
	instance.prototype.setMainPage = function( page )
	{
		this.m_mainPage = this;	
	}
	
	instance.prototype.getEditor = function()
	{
		return this.m_editor;
	}
	
	instance.prototype.setStyle = function( style )
	{
		//try
		{
			this.m_editor.setOption( "theme", style );
		}
		//catch( error )
		{
			//console.log(error);
		}
	}
	
	instance.prototype.setLanguage = function( language )
	{
		if( language != 'auto' )
		{
			//console.log(" manual set language type "+language);
			this.m_editor.setOption( "mode", language );
		}
		else
		{
			//console.log(" auto set language matching "+this.m_ext);
			var info = CodeMirror.findModeByExtension( this.m_ext );
			if (info) 
			{
				mode = info.mode;
				this.m_editor.setOption( "mode", mode );
			}
		}
	}
	
	//get file content
	instance.prototype.requestFileContent = function( editor, editorInstance ) 
	{
		top.Proutor.setLoading( true );
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
		xhr_object.open("POST", "getFileContent.php", true); 
		xhr_object.onreadystatechange = function() 
		{ 
			if(xhr_object.readyState == 4) 
			{
				var data = JSON.parse( xhr_object.responseText );
				if( data['error'] == "0" )
				{
					try 
					{
						editorInstance.setValue(data.data);
						editor.m_curChange = editorInstance.getDoc().changeGeneration( true );
						editor.UpdateSaveStatus();
						editor.m_ext = data.ext;
						var div;
						div = document.getElementById('div_path');
						div.innerHTML = "<b>Path</b> "+data.path;
						div = document.getElementById('div_perm');
						div.innerHTML = "<b>Rights</b> "+data.perm;
						div = document.getElementById('div_size');
						div.innerHTML = "<b>Size</b> "+data.size+"o";

					}
					catch( error)
					{
						top.Proutor.setLoading( false );
						alert("[requestFileContent] editor error : "+error);
						top.Tabs.removeTab( this.m_curFileName, false);
					}	
				}
				else
				{
					if( data.error == 4 )
					{
						alert("cannot open "+data.name+" : file is too big");
					}
					else
					{
						alert(data.error);
					}
				}
				editor.setLanguage( 'auto' );
				CodeMirror.colorize();
				top.Tabs.UpdateStyle();
				top.Proutor.setLoading( false );
				//top.Tabs.saveOpenedTabs();
			}
		} 
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		var data = "file="+encodeURIComponent( this.m_curFile ); 
		xhr_object.send(data); 
	}
	
	
	instance.prototype.saveFileContent = function()
	{
		this.requestSaveFileContent( this, this.m_editor );
	}
	
	instance.prototype.requestSaveFileContent = function( editor, editorInstance )
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
		{ 
			alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
			return; 
		} 
		xhr_object.open("POST", "setFileContent.php", true); 
		xhr_object.onreadystatechange = function() 
		{ 
			if(xhr_object.readyState == 4) 
			{
				var data = JSON.parse( xhr_object.responseText );
				editor.m_curChange = editorInstance.getDoc().changeGeneration( true );
				editor.UpdateSaveStatus();
			}
		} 
		xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
		var doc = editorInstance.getDoc();
		var content = doc.getValue();
		content = encodeURIComponent( content  );
		var data = "file="+encodeURIComponent( editor.m_curFile )+"&data="+content; 
		xhr_object.send(data);
	}
	
	instance.prototype.Resize = function( height )
	{
		if( height === undefined )
		{
			height = top.Proutor.getPageDimensions().h;
		}
		var div = document.getElementById('codeMirrorEditorDiv');
		div.style.height = height + "px";
		console.log("resize editor "+height);
		this.m_editor.setSize("100%", height+"px");
	}
	
	instance.prototype.close = function()
	{
		if( !this.getIsClean )
		{
			
			return false;
		}
		return true;
	}
	
	instance.prototype.onKeyPress = function(e)
	{
		this.UpdateSaveStatus();
	}
	
	instance.prototype.getIsClean = function()
	{
		return this.m_editor.doc.isClean( this.m_curChange );
	}
	
	instance.prototype.UpdateSaveStatus = function()
	{
		var pDiv = document.getElementById("div_save");
		var bIsClean = this.m_editor.doc.isClean( this.m_curChange );
		if( pDiv != null && !bIsClean )
		{
			pDiv.innerHTML = "NOT SAVED";
		}
		else
		{
			pDiv.innerHTML = "";
		}
	}
	
	return{instance:instance}
}();