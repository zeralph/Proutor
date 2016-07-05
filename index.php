<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="Menu/css/menu.css">
		
		<script type="text/javascript" src="Browser/javascript/browser.js"></script>
		<link rel="stylesheet" href="Browser/css/browser.css">

		<script type="text/javascript" src="Tabs/javascript/tabs.js"></script>
		<link rel="stylesheet" href="Tabs/css/tabs.css">
		
		<script src="Menu/javascript/Menu.js"></script> 
		<script src="javascript/Proutor.js"></script> 
		<script src="javascript/Resize.js"></script> 
		<script src="Parameters/Parameters.js"></script> 
	</head>
	<body>
		<script type="text/javascript">
				var m_Proutor = new Proutor();
				var m_Resize = new Resize( m_Proutor );
				window.onload 			= function(){m_Proutor.onLoad();};
				window.onresize 		= function(){m_Proutor.onResize();};
				window.onkeypress 		= function(e){m_Proutor.onKeyPress(e);};
				window.onkeydown 		= function(e){m_Proutor.onKeyPress(e);};
				window.onmousedown 		= function(e){m_Resize.doDown(e);};
				window.onmouseup   		= function(e){m_Resize.doUp(e);};
				window.onmousemove 		= function(e){m_Resize.doMove(e);};
				window.onbeforeunload  	= function(){m_Proutor.onUnload();};
			
				window.ProutorInstance = m_Proutor;
			
				//console.log( "navigator : "+navigator.userAgent.search("Firefox") );
				//Parameters.setParameter( "style", "zob");	
				//Parameters.getParameter( "style", onTest);
				//function onTest( toto )
				//{
				//	console.log("onTest : "+toto);
				//}
				
		</script>
		<div id="overlay" class="overlay">
				rototototo
		</div>
    	<div id="main" class="main">
            <div id="menuDiv" class="menuDiv">
				<?php include("Menu/menuContent.php"); ?>
         	</div>
			<div id="browser" class="browser" onload="loadBrowser">
			</div>
			<div id="cesure" class="cesure"></div>
			<div id="editor" class="editor">
				<div id="tabList" class="tabList">
				</div>
				<div id="tabContainer" class="tabContainer">
				</div>
			</div>
            <div id="bottombar" class="bottombar">BOTTOMBAR</div>
			<div id="search" class="search" ><?php include("Search/search.php"); ?></div>
        </div>
	</body>
</html>














