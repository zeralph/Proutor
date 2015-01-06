<?
	$file = $_GET['file'];
	echo"$file<br>";
	$t = realpath ( $file );
	echo "$t<br>";
	$t = filesize( $file );
	echo "$t<br>";
		$t = fopen( $file, 'r' );
	echo "$t<br>";
?>