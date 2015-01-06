<?
	$file = "";
	if( isset( $_GET['file'] ) )
	{
		$file = $_GET['file'];
	}	
	$name = "";
	if( isset( $_GET['name'] ) )
	{
		$name = $_GET['name'];
	}
	$show = false;
	if( isset( $_GET['show'] ) )
	{
		$show = true;
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
		<link rel="stylesheet" href="../CodeMirror/theme/night.css">
		<link rel="stylesheet" href="../CodeMirror/lib/codemirror.css">	
		<link rel="stylesheet" href="editor.css">
		<link rel="stylesheet" href="../CodeMirror/theme/3024-day">
		<link rel="stylesheet" href="../CodeMirror/theme/3024-night.css">
		<link rel="stylesheet" href="../CodeMirror/theme/ambiance.css">
		<link rel="stylesheet" href="../CodeMirror/theme/ambiance-mobile.css">
		<link rel="stylesheet" href="../CodeMirror/theme/base16-dark.css">
		<link rel="stylesheet" href="../CodeMirror/theme/base16-light.css">
		<link rel="stylesheet" href="../CodeMirror/theme/blackboard.css">
		<link rel="stylesheet" href="../CodeMirror/theme/cobalt.css">
		<link rel="stylesheet" href="../CodeMirror/theme/eclipse.css">
		<link rel="stylesheet" href="../CodeMirror/theme/elegant.css">
		<link rel="stylesheet" href="../CodeMirror/theme/erlang-dark.css">
		<link rel="stylesheet" href="../CodeMirror/theme/lesser-dark.css">
		<link rel="stylesheet" href="../CodeMirror/theme/mbo.css">
		<link rel="stylesheet" href="../CodeMirror/theme/mdn-like.css">
		<link rel="stylesheet" href="../CodeMirror/theme/midnight.css">
		<link rel="stylesheet" href="../CodeMirror/theme/monokai.css">
		<link rel="stylesheet" href="../CodeMirror/theme/neat.css">
		<link rel="stylesheet" href="../CodeMirror/theme/neo.css">
		<link rel="stylesheet" href="../CodeMirror/theme/night.css">
		<link rel="stylesheet" href="../CodeMirror/theme/paraiso-dark.css">
		<link rel="stylesheet" href="../CodeMirror/theme/paraiso-light.css">
		<link rel="stylesheet" href="../CodeMirror/theme/pastel-on-dark.css">
		<link rel="stylesheet" href="../CodeMirror/theme/rubyblue.css">
		<link rel="stylesheet" href="../CodeMirror/theme/solarized.css">
		<link rel="stylesheet" href="../CodeMirror/theme/the-matrix.css">
		<link rel="stylesheet" href="../CodeMirror/theme/tomorrow-night-eighties.css">
		<link rel="stylesheet" href="../CodeMirror/theme/twilight.css">
		<link rel="stylesheet" href="../CodeMirror/theme/vibrant-ink.css">
		<link rel="stylesheet" href="../CodeMirror/theme/xq-dark.css">
		<link rel="stylesheet" href="../CodeMirror/theme/xq-light.css">
		<script src="../CodeMirror/lib/codemirror.js"></script>
		
		<script src="../CodeMirror/mode/meta.js"></script>
		<script src="../CodeMirror/mode/clike/clike.js"></script>
		<script src="../CodeMirror/mode/css/css.js"></script>
		<script src="../CodeMirror/mode/javascript/javascript.js"></script>
		<script src="../CodeMirror/mode/htmlmixed/htmlmixed.js"></script>
		<script src="../CodeMirror/mode/php/php.js"></script>
		<script src="../CodeMirror/mode/python/python.js"></script>
		<script src="../CodeMirror/mode/xml/xml.js"></script>
		
		
		<script src="../CodeMirror/addon/edit/matchbrackets.js"></script>
      	<script src="../CodeMirror/addon/runmode/colorize.js"></script>
		<script src="../CodeMirror/addon/search/search.js"></script>
		<script src="../CodeMirror/addon/search/searchcursor.js"></script>
		<script src="../CodeMirror/addon/search/match-highlighter.js"></script>
		<script src="../Parameters/parameters.js"></script>
		<script src="editor.js"></script>
	</head>
	<body>
		<div id="codeMirrorEditorDiv" class="codeMirrorEditorDiv">
			<div id="editorHead" class="editorHead">
				<div class="editorHeadEntry" id="div_path"></div>
				<div class="editorHeadEntry" id="div_perm"></div>
				<div class="editorHeadEntry" id="div_size"></div>
				<div class="editorHeadEntryImportant" id="div_save"></div>
			</div>
			<form>
				<textarea id="code" name="code"></textarea>
			</form>
			<script>
					window.onload 		= onLoad;
					window.onkeypress 	= top.Proutor.onKeyPress;
					window.onkeydown 	= top.Proutor.onKeyPress;
					document.onmousedown 	= top.Resize.doDown;
					document.onmouseup   	= top.Resize.doUp;
					document.onmousemove 	= top.Resize.doMove;
			
				
					function onLoad()
					{
						var curFile = "<? echo $file; ?>";
						var curFileName = "<? echo $name; ?>";
						var bShow = <? if($show){echo"true";}else{echo"false";} ?>;
						var myEditor = new Editor.instance( curFile, curFileName, bShow );
						myEditor.init();
						top.Tabs.m_editors[curFile] = myEditor;
						top.Tabs.m_currentEditor = top.Tabs.m_editors[curFile];
						top.Tabs.m_currentEditor.Resize();
					}
			</script>
		</div>
	</body>
</html>
























