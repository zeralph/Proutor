<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
	</head>
	<body>

<?php
	$path = "/data/1to/_VIDZ_MERDE";
	$path = str_replace(" ", "\ ", $path);
	$path = str_replace("(", "\(", $path);
	$path = str_replace(")", "\)", $path);
	function removelastSlash( $path )
	{	
		$pos = strrpos( $path, '/'); 
		if( $pos == (strlen($path)-1) )
		{
			$path = substr($path, 0, -1);
		}
		return $path;
	}

	//$path = removelastSlash( $path );
	echo "cd $path && ls -p | grep -v / <br>";
	exec("cd $path && ls -d */", $folders);
	exec("cd $path && ls -p | grep -v / ", $files);

	echo "$path<br>\n";

	foreach($folders  as $t )
	{
		$t = removelastSlash( $t );
		echo "$t<br>\n";
	}

	foreach($files  as $t )
	{
		$t = removelastSlash( $t );
		echo "$t<br>\n";
	}

?>

	</body>
</html>