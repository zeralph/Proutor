		<ul class="menu" id="menu">
			<li><a href="#" class="menulink">File</a>
				<ul>
					<li><a onclick="menu.close(); Tabs.addNewTab();">New</a></li>
					<li><a onclick="menu.close()">Open</a></li>
					<li><a onclick="m_global_currentEditor.saveFileContent()">Save</a></li>
					<li><a href="#">Quit</a></li>
				</ul>
			</li>
			<li>
				<a href="#" class="menulink">Edit</a>
				<ul>
					<li><a href="#">Navigation Item 1</a></li>
					<li>
						<a href="#" class="sub">Navigation Item 2</a>
						<ul>
							<li class="topline"><a href="#">Navigation Item 1</a></li>
							<li><a href="#">Navigation Item 2</a></li>
							<li><a href="#">Navigation Item 3</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				<a href="#" class="menulink">Search</a>
				<ul>
					<li><a href="#">Navigation Item 1</a></li>
					<li><a href="#">Navigation Item 2</a></li>
					<li><a href="#">Navigation Item 3</a></li>
					<li><a href="#">Navigation Item 4</a></li>
					<li><a href="#">Navigation Item 5</a></li>
					<li>
						<a href="#" class="sub">Navigation Item 6</a>
						<ul>
							<li class="topline"><a href="#">Navigation Item 1</a></li>
							<li><a href="#">Navigation Item 2</a></li>
						</ul>
					</li>
					<li><a href="#">Navigation Item 7</a></li>
					<li><a href="#">Navigation Item 8</a></li>
					<li><a href="#">Navigation Item 9</a></li>
					<li><a href="#">Navigation Item 10</a></li>
				</ul>
			</li>
			<li>
				<a href="#" class="menulink">Display</a>
				<ul>
					<li>
						<a href="#" class="sub">Syntax Color</a>
						<ul>
							<li class="topline"><a onclick="menu.close(); Proutor.changeSyntax('auto');">Auto</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('clike');">C / C++</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('css');">Css</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('javascript');">Javascript</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('htmlmixed');">Html</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('php');">Php</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('python');">Pyhton</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeSyntax('xml');">Xml</a></li>
						</ul>
					</li>
					<li>
						<a href="#" class="sub">CodeMirror theme</a>
						<ul>
							<li class="topline"><a onclick="menu.close(); Proutor.changeEditorStyle('3024-day');">3024-day</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('3024-night');">3024-night</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('ambiance');">ambiance</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('ambiance-mobile');">ambiance-mobile</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('base16-dark');">base16-dark</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('base16-light');">base16-light</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('blackboard');">blackboard</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('cobalt');">cobalt</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('eclipse');">eclipse</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('elegant');">elegant</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('erlang-dark');">erlang-dark</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('lesser-dark');">lesser-dark</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('mbo');">mbo</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('mdn-like');">mdn-like</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('midnight');">midnight</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('monokai');">monokai</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('neat');">neat</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('neo');">neo</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('night');">night</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('paraiso-dark');">paraiso-dark</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('paraiso-light');">paraiso-light</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('pastel-on-dark');">pastel-on-dark</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('rubyblue');">rubyblue</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('solarized');">solarized</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('the-matrix');">the-matrix</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('tomorrow-night-eighties');">tomorrow-night-eighties</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('twilight');">twilight</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('vibrant-ink');">vibrant-ink</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('xq-dark');">xq-dark</a></li>
							<li class="sub"><a onclick="menu.close(); Proutor.changeEditorStyle('xq-light');">xq-light</a></li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	<script type="text/javascript">
		var menu=new menu.dd("menu");
		menu.init("menu","menuhover");
	</script>