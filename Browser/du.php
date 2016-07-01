<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
	</head>
	<body>

<?php
	$path = "/home/ralph/";
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
	echo "du -chs $path | grep total<br>";
	exec("du -ch $path | grep total", $result);
	//exec("cd $path && ls -p | grep -v / ", $files);

	echo "$path<br>\n";
	print_r($result);

?>

	</body>
</html>