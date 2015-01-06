<?
	if( isset($_POST["path"]) )
	{
		$path = $_POST["path"];
	}
	else
	{
		$path = "/data/1to";
	}

	function removelastSlash( $path )
	{	
		$pos = strrpos( $path, '/'); 
		if( $pos == (strlen($path)-1) )
		{
			$path = substr($path, 0, -1);
		}
		return $path;
	}

	$pathLinux = removelastSlash( $path );
	$pathLinux = str_replace(" ", "\ ", $pathLinux);
	$pathLinux = str_replace("(", "\(", $pathLinux);
	$pathLinux = str_replace(")", "\)", $pathLinux);
	$pathLinux = str_replace("'", "\'", $pathLinux);
	$pathLinux = str_replace("&", "\&", $pathLinux);
	//echo "cd $path && ls -d */<br>";
	exec("cd $pathLinux && ls -d */", $folders);
	//exec("cd $pathLinux && ls -p | grep -v / ", $files);
	exec("cd $pathLinux && ls -sp | grep -v /", $files);

?>
<?php
 	header('Content-Type: text/plain');
 	header ('Cache-Control: no-cache');
 	header ('Cache-Control: no-store' , false);     // false => this header not override the previous similar header

	$Date=@date("l, d F Y  ( H:i:s  A )");


// Manually create a string representation of a new xml document
// Inserting also the GET variable 

	//1st entry in $folder is total size, remove it.
	$curFolderSize = isset($files[0])?$files[0]:0;
	$curFolderSize = str_replace("total","",$curFolderSize);
	$curFolderSize = intval( $curFolderSize );
	$files = array_slice($files, 1);

	$path = removelastSlash( $path );
	$nbFolders = count( $folders );
	$nbFiles = count( $files );
	$struct = array(
		'type' => 'info',
		'folder' => $path,
		'size' => $curFolderSize,
		'nbFolders' => $nbFolders,
		'nbFiles' => $nbFiles,
		'scanned' => '1',
		'name' => $path,
		);

	$arr[0] = $struct;

	//push folders
	foreach($folders  as $t )
	{
		$t = removelastSlash( $t );
		$t = str_replace("&", "&amp;", $t);
		$t = str_replace("<", "&lt;", $t);
		$t = str_replace(">", "&gt;", $t);
		$p= "$path/$t";
		$new = array(
			'type' => 'folder',
			'path' => $p,
			'size' => '0',
			'nbFolders' => '0',
			'nbFiles' => '0',
			'scanned' => '0',
			'name' => $t,
			);
		$arr[$t] = $new;
	}
	//push files
	foreach($files  as $t )
	{
		$s = 0;
		$t = trim($t);
		$t = explode( " ", $t, 2);
		$s = $t[0];
		$t = $t[1];
		$t = removelastSlash( $t );
		$t = str_replace("&", " &amp;", $t);
		$t = str_replace("<", " &lt;", $t);
		$t = str_replace(">", " &gt;", $t);
		$p= "$path/$t";
		$new = array(
			'type' => 'file',
			'path' => $p,
			'size' => $s,
			'name' => $t,
			);
		$arr[$t] = $new;
	}
	$arr =  json_encode($arr);
	echo($arr);
	//print_r( $arr );
//echo json_encode( $arr );
/*
	$svr = $_SERVER['REMOTE_ADDR'];
	$xmlStr="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	$xmlStr=$xmlStr."<data>\n";
   	$xmlStr=$xmlStr."\t<Date>$Date</Date>\n";
	$xmlStr=$xmlStr."\t\t<Folder fullpath=\"$path\" name=\"$path\" size=\"$size\">\n";
	$l = count( $folders );
	$xmlStr=$xmlStr."\t\t<nbFolders>$l</nbFolders>\n";
	$l = count( $files );
	$xmlStr=$xmlStr."\t\t<nbFiles>$l</nbFiles>\n";
	foreach($folders  as $t )
	{
		$t = removelastSlash( $t );
		$t = str_replace("&", "&amp;", $t);
		$t = str_replace("<", "&lt;", $t);
		$t = str_replace(">", "&gt;", $t);
		$xmlStr=$xmlStr."\t\t\t<Folder fullpath=\"$path/$t\" name=\"$t\"></Folder>\n";
	}

	foreach($files  as $t )
	{
		$t = removelastSlash( $t );		
		$t = str_replace("&", " &amp;", $t);
		$t = str_replace("<", " &lt;", $t);
		$t = str_replace(">", " &gt;", $t);
		$xmlStr=$xmlStr."\t\t\t<File fullpath=\"$path/$t\" name=\"$t\"></File>\n";
	}
	$xmlStr=$xmlStr."\t\t</Folder>\n";
   	$xmlStr=$xmlStr."\t<ip>'$svr'</ip>\n";
	$xmlStr=$xmlStr."</data>\n";

	echo $xmlStr;  
*/

?>




