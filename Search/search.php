<?


?>
<script type="text/javascript">
	
	function launchSearch()
	{
		if(Tabs.m_currentEditor != null )
		{
			var search = document.getElementById('searchInput').value;
			Tabs.m_currentEditor.search( search, false, false, false );
		}
	}
	
	function nextMatch()
	{
		if( Tabs.m_currentEditor!= null )
		{
			Tabs.m_currentEditor.nextMatch();
		}
	}
	
	function prevMatch()
	{
		if( Tabs.m_currentEditor != null )
		{
			Tabs.m_currentEditor.prevMatch();
		}
	}
	
</script>
<div class="searchInner">
	<br>
	Search:<br>
	<input type="text" id="searchInput" value="" width="200">
	<br><br>
	<button onclick="launchSearch()">Search</button>	
	<br><br>
	<INPUT type="checkbox" id="searchMatchCase">Match case
	&nbsp;&nbsp;
	<INPUT type="checkbox" id="searchLoop">Loop
	<br><br>
	<button onclick="nextMatch()">Next</button>	
	<button onclick="prevMatch()">Prev</button>	
</div>