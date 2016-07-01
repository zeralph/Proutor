<?php
	if( !isset( $_POST["data"] ) || !isset( $_POST["file"] ) )
	{
		echo json_encode("error: imcomplete data received");
		die();
	}
	$file = ($_POST["file"]);
	$data= $_POST["data"];
/*
	if( filesize($filename == 0 )	//file does not exists, create
	{
	}
	   
	if( filesize($filename == 0 )
	{
		echo json_encode("error creating file");
	}
	else
	*/
	{
		$handler = fopen( $file, "w" );
		if( $handler == false )
		{
			echo json_encode("right permision error on ".$file);
		}
		else
		{
			$res = fwrite( $handler, $data );
			fclose( $handler );
			if( !$res )
			{
				echo json_encode("error writing file");
			}
			else
			{
				echo json_encode( $res." octets written" );
			}
		}
	}
?>