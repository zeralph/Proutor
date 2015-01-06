var menu=function() 
{
	var t=1,z=50,s=6,a;
	
	//----------------------------
	function dd(n)
	{
		this.n=n; 
		this.h=[]; 
		this.c=[]
	}
	
	dd.prototype.close = function()
	{
		this.c.forEach(function(entry) 
		{
			entry.style.overflow='hidden';
			entry.style.height='0px';
			//console.log(entry);
			//sl(entry, -1);
		});
	}	
	
	//----------------------------
	dd.prototype.init = function(p,c)
	{
		a=c; var w=document.getElementById(p), s=w.getElementsByTagName('ul'), l=s.length, i=0;
		for(i;i<l;i++)
		{
			var h=s[i].parentNode; this.h[i]=h; this.c[i]=s[i];
			h.onmouseover=new Function(this.n+'.st('+i+',true)');
			h.onmouseout=new Function(this.n+'.st('+i+')');
			//console.log( this.n+'.st('+i+')' );
		}
	}
	
	//----------------------------
	dd.prototype.st=function(x,f)
	{
		//console.log(" st "+x+", "+f);
		var c=this.c[x];
		var h=this.h[x];
		var p=h.getElementsByTagName('a')[0];
		clearInterval(c.t); 
		c.style.overflow='hidden';
		if(f)
		{
			p.className+=' '+a;
			if(!c.mh)
			{
				c.style.display='block';
				c.style.height='';
				c.mh=c.offsetHeight; 
				c.style.height='0'
			}
			if(c.mh==c.offsetHeight)
			{
				c.style.overflow='visible'
			}
			else
			{
				c.style.zIndex=z; 
				z++; 
				c.t=setInterval(function(){sl(c,1)},t);
			}
		}
		else
		{
			p.className=p.className.replace(a,''); c.t=setInterval(function(){sl(c,-1)},t)
		}
	}
	
	//----------------------------
	function sl(c,f)
	{
		//console.log(" sl "+c+", "+f)
		var h= parseInt(c.style.height) ;//c.offsetHeight;
		//console.log(" h "+h);
		if((h<=0&&f!=1)||(h>=c.mh&&f==1))
		{
			if(f==1)
			{
				c.style.filter=''; 
				/*c.style.opacity=1;*/ 
				c.style.overflow='visible'
			}
			//console.log("strop");
			clearInterval(c.t); return
		}
		var d = 0;
		if( f==1)
		{
			d = Math.ceil((c.mh-h)/s)
		}
		else
		{
			d = Math.ceil(h/s);
			//o=h/c.mh
		}
		c.style.height=h+(d*f)+'px';
		//c.offsetHeight=h+(d*f)+'px'; 
		//console.log(" sl "+c.style.height+", "+c.mh+", "+f+", "+d );
	}
	
	return{dd:dd}
}();
	
	
	
	
	
	
	