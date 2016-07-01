<?php
	
	$paramFile = "/var/www/private/Proutor/Parameters/parameters.cfg";
	$params = null;
	$nbFileHistory = 5;

	function getParameter( $name, $isArray=false )
	{
		global $paramFile;
		global $params;
		if( !isset( $params ) )
		{
			if( !loadParameters() )
			{
				return null;
			}
		}
		if( isset( $params[$name] ) )
		{
			return $params[$name];
		}
		return null;
	}


	function setParameter( $name, $value )
	{
		global $paramFile;
		global $params;
		if( !isset( $params ) )
		{
			if( !loadParameters() )
			{
				return false;
			}
		}
		$params[$name] = ($value);
		return true;
	}

	function saveParameters()
	{
		global $paramFile;
		global $params;
		$data = json_encode($params);
		file_put_contents($paramFile, $data);
	}

	function loadParameters()
	{
		global $paramFile;
		global $params;
		$handle = fopen($paramFile, 'r' );
		$s = filesize( $paramFile );
		if( $s > 0 )
		{
			$data = fread( $handle, $s );
			$params = json_decode( $data, true );
		}
		else
		{
			$params = array();
		}
		fclose($handle);
		return true;
	}

	function addOpenendFile( $file )
	{
		global $nbFileHistory;
		$arr = getParameter( 'openedFiles' );
		$nbFiles  = getParameter('openedFileIndex');
		if( !isset($arr) )
		{
			$arr = array();
		}
		else
		{
			$arr = json_decode( $arr );
		}
		$f = $file;
		if( !isset($nbFiles) )
		{
			$nbFiles = 0;
		}
		$idx = count($arr);
		$arr[$f] = $f;
		$nbFiles ++;
		if($nbFiles>=$nbFileHistory)
		{
			$nbFiles=0;
		}
		setParameter( 'openedFileIndex', $nbFiles );
		$arr = json_encode($arr);
		setParameter( 'openedFiles', $arr );
		saveParameters();
	}
?>

<?php

if( isset( $_POST['getParam'] ) )
{
	$p = $_POST['getParam'];
	echo( getParameter( $p ) );
}
else if( isset( $_POST['setParam'] ) && isset( $_POST['value'] ) )
{
	$p = $_POST['setParam'];
	$v = $_POST['value'];
	$ret = setParameter( $p, $v );
	saveParameters();
	echo $ret;
}		 
else if( isset( $_GET['setParam'] ) && isset( $_GET['value'] ) )
{
	$p = $_GET['setParam'];
	$v = $_GET['value'];
	$ret = setParameter( $p, $v );
	saveParameters();
	echo $ret;
}	
else if( isset( $_GET['getParam'] ) )
{
	$p = $_GET['getParam'];
	echo( getParameter( $p ) );
}
?>









<?php
	
/*
	//test
	echo"load parameters<br>";
	loadParameters();
print_r( $params );
	echo"write toto <br>";
	setParameter('toto', "tutu");
	echo"write tata <br>";
	setParameter("tata", array('a','b','c') );
	echo"write titi <br>";
	setParameter("titi", 12);
	echo"write toto <br>";
	setParameter("tete", false);
	echo"save<br>";
	saveParameters();
	loadParameters();
	echo(" get toto : ". getParameter("toto") ."<br>");
	echo(" get tata : ". print_r(getParameter("tata")) ."<br>");
	echo(" get titi : ". getParameter("titi") ."<br>");
	echo(" get tutu : ". getParameter("tete") ."<br>");
*/	
?>


















