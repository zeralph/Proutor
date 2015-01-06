<?

	function getFullPerm( $file )
	{
		$perms = fileperms($file);

		if (($perms & 0xC000) == 0xC000) {
			// Socket
			$info = 's';
		} elseif (($perms & 0xA000) == 0xA000) {
			// Symbolic Link
			$info = 'l';
		} elseif (($perms & 0x8000) == 0x8000) {
			// Regular
			$info = '-';
		} elseif (($perms & 0x6000) == 0x6000) {
			// Block special
			$info = 'b';
		} elseif (($perms & 0x4000) == 0x4000) {
			// Directory
			$info = 'd';
		} elseif (($perms & 0x2000) == 0x2000) {
			// Character special
			$info = 'c';
		} elseif (($perms & 0x1000) == 0x1000) {
			// FIFO pipe
			$info = 'p';
		} else {
			// Unknown
			$info = 'u';
		}
		
		// Owner
		$info .= (($perms & 0x0100) ? 'r' : '-');
		$info .= (($perms & 0x0080) ? 'w' : '-');
		$info .= (($perms & 0x0040) ?
					(($perms & 0x0800) ? 's' : 'x' ) :
					(($perms & 0x0800) ? 'S' : '-'));
		
		// Group
		$info .= (($perms & 0x0020) ? 'r' : '-');
		$info .= (($perms & 0x0010) ? 'w' : '-');
		$info .= (($perms & 0x0008) ?
					(($perms & 0x0400) ? 's' : 'x' ) :
					(($perms & 0x0400) ? 'S' : '-'));
		
		// World
		$info .= (($perms & 0x0004) ? 'r' : '-');
		$info .= (($perms & 0x0002) ? 'w' : '-');
		$info .= (($perms & 0x0001) ?
					(($perms & 0x0200) ? 't' : 'x' ) :
					(($perms & 0x0200) ? 'T' : '-'));
		
		return $info;
	}


	//echo $_SERVER['DOCUMENT_ROOT'];
	$error = 0;
	$data = "";
	$ext ="";
	if( !isset( $_POST["file"] ) )
	{
		$error = 1;
	}
	else
	{
		$file = $_POST["file"];
		$name = $file;
		$file = urldecode( $file );
		$file = realpath ( $file );
		$size = 0;
		//echo json_encode($file);
		//die();
		$handler = fopen( $file, "r" );
		if( !$handler )
		{
			$error = 2;
		}
		else
		{
			$size = filesize($file);
			if( $size > 0 )
			{	
				if( $size > 50000 )
				{
					$text ="";
					$error = 4;
				}
				else
				{
					$text = fread( $handler, $size );
				}
			}
			else
			{
				$text = "";
			}
			$data = $text;
			$ext = pathinfo($file, PATHINFO_EXTENSION);
			$perm = getFullPerm($file);
			fclose( $handler );
		}
	}
	$struct = array(
		'name' => $name,
		'error' => $error,
		'ext' => $ext,
		'data' => $data,
		'path' => $file,
		'perm' => $perm,
		'size' => $size,
	);
	$struct =  json_encode($struct);
	echo $struct;
?>