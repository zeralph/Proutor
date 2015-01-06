<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>BROWSER</title>
		<script type="text/javascript" src="javascript/browser.js"></script>
		<link rel="stylesheet" href="css/browser.css" type="text/css" />
	</head>

	<body>
		<script type="text/javascript">
			
			//var m_Browser= new Browser();
			//m_Browser.init();
			
			document.onkeypress = top.onKeyPress;
			document.onkeydown = top.onKeyPress;
			//in resize.js
			document.onmousedown = top.doDown;
			document.onmouseup   = top.doUp;
			document.onmousemove = top.doMove;
			//console.log("toto" + top.doMove);
			Browser.init();
		</script>
	</body>
</html>







