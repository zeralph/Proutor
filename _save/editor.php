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

?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Menu</title>
		<link rel="stylesheet" href="theme/night.css">
		<link rel="stylesheet" href="lib/codemirror.css">	
		<link rel="stylesheet" href="../Editor/editor.css">
		<script src="lib/codemirror.js"></script>
		<script src="mode/javascript/javascript.js"></script>
		<script src="mode/xml/xml.js"></script>
		<script src="mode/htmlmixed/htmlmixed.js"></script>
		<script src="mode/css/css.js"></script>
		<script src="mode/php/php.js"></script>
		<script src="mode/htmlmixed/htmlmixed.js"></script>
		<script src="mode/meta.js"></script>
		<script src="addon/edit/matchbrackets.js"></script>
      	<script src="addon/runmode/colorize.js"></script>
		<script src="addon/search/search.js"></script>
		<script src="addon/search/searchcursor.js"></script>
		<script src="addon/search/match-highlighter.js"></script>
		<script src="../Parameters/parameters.js"></script>
		<script src="../Editor/editor.js"></script>
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
					window.onload = onLoad;
					function onLoad()
					{
						var curFile = "<? echo $file; ?>";
						var curFileName = "<? echo $name; ?>";
						var myEditor = new Editor.instance( curFile, curFileName );
						myEditor.init();
						
						top.Tabs.m_editors[curFile] = myEditor;
						console.log("add "+top.Tabs.m_editors[curFile]);
						top.Tabs.m_currentEditor = top.Tabs.m_editors[curFile];
					}
			</script>
		</div>
	</body>
</html>
























