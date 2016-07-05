<?php include("../Parameters/parameters.php"); ?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
		<script src="../Parameters/Parameters.js"></script>
		<script type="text/javascript">
			function retFunc( data )
			{
				data = JSON.parse( data );
				var dataStr = "" ;
				for( var i=0; i<data.length; i++ )
				{
					console.log("1- "+ data[i]);
					console.log("2- "+data[i][0]);
                  	link='top.m_global_tabs.addNewTab(null, "'+data[i][1]+'", "'+data[i][0]+'" )';
					dataStr = dataStr + '<br><a href="'+link+'">'+data[i][1]+'</a>';
				}
				var div = document.getElementById('lastFiles');
				div.innerHTML = dataStr;
			}
			//myParameters.getFileHistory( retFunc );
		</script>
	</head>
	<body bgcolor="#E6E6F00">
		<h1> THIS IS THE HOME TAB</h1>
		<script type="text/javascript">
			document.onkeypress = top.onKeyPress;
			document.onkeydown = top.onKeyPress;
			//in resize.js
			document.onmousedown = top.Resize.doDown;
			document.onmouseup   = top.Resize.doUp;
			document.onmousemove = top.Resize.doMove;
		</script>
		<div id="lastFiles">
			<?php
				$arr = getParameter( 'openedFiles', true );
				$nbFiles  = getParameter('openedFileIndex');

echo"<br>nb files $nbFiles";

				print_r($arr);
				echo"<br>";
				echo($arr[0]);
				echo"<br>";
				foreach( $arr as $t )
				{
					print_r( $t );
					//echo( "<a href=$t[0]>$t[1]</a><br>" );
				}
			?>
		</div>
	</body>
</html>
