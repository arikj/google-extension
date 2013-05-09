var defaultImage = "Untitled.jpg";
var targetWindow = null;		
var tabCount = 0;			
var currentURL=new Array();		
var currentId=new Array();			
var currentTitle=new Array();		
var currentFavicon=new Array();	
var flagforbook=0;
var flagfortab=0;
var currentImages = new Array();		
var bookURL = new Array();		
var cls = new Array();
var closeTitle=new Array();
var URL = new Array();
var closeId = new Array();
var closeURL = new Array();
var superTabNames = new Array();
var bookTitle = new Array();
var superTabWithId = new Array();
var countBaseURL=0;
var Title = new Array();
var BaseURL=new Array();
var tabsForBaseURL=new Array();
var use="span5";
var spl=30;

function onAnchorClick(id) {
	chrome.tabs.update(currentId[id], { selected: true });
  	return false;
}


function on_book_random_button_Click()
{
	var frm=document.getElementById("datatable");
	var j=0;
	var flag=0;
	if(frm.arrCheck.length == undefined){
		if(frm.arrCheck.checked){
			flag=1;
			bookURL[0]=currentURL[frm.arrCheck.value];
			bookTitle[0]=currentTitle[frm.arrCheck.value];
			frm.arrCheck.checked=false;
		}
	}
	else{
		for (i = 0; i < frm.arrCheck.length; i++)
		{
			if (frm.arrCheck[i].checked)
			{
				flag=1;
				bookURL[j]=currentURL[frm.arrCheck[i].value];
				bookTitle[j]=currentTitle[frm.arrCheck[i].value];
				j=j+1;
				frm.arrCheck[i].checked=false;
			}
		}
	}
	if(flag==0)
	{
		document.getElementById("status").style.display="block";	
		document.getElementById("status").className="label label-important";
		document.getElementById("status").innerHTML="Please select window to be bookmarked";
	}
	else
	{
		var foldername=prompt("Please enter folder name(leave blank if no folder)","");
		if(foldername!=null)
		{
			if(foldername)
			{
				chrome.bookmarks.create({'parentId':"1",'title': foldername},
							  function(newFolder)
								{	
									addbookmark(newFolder);
									
								}
							);
			}
			else
			{
				var newFolder = new Object();
				newFolder.id="1";
				addbookmark(newFolder);
			}
		}
		else
		{
			document.getElementById("status").style.display="none";
		}
	}
}


function supertab()
{
	var frm=document.getElementById("datatable");
	var j=0;
	var flag=0;
	var URL=new Array();
	if(frm.arrCheck.length == undefined){
		if(frm.arrCheck.checked){
			flag=1;
			URL[0]=currentURL[frm.arrCheck.value];
			Title[0]=currentTitle[frm.arrCheck.value];
			frm.arrCheck.checked=false;
		}
	}
	else{
		for (i = 0; i < frm.arrCheck.length; i++)
		{
			if (frm.arrCheck[i].checked)
			{
				flag=1;
				URL[j]=currentURL[frm.arrCheck[i].value];
				Title[j]=currentTitle[frm.arrCheck[i].value];
				j=j+1;
				frm.arrCheck[i].checked=false;
			}
		}
	}
	if(flag==0)
	{
		document.getElementById("status").style.display="block";	
		document.getElementById("status").className="label label-important";
		document.getElementById("status").innerHTML="Please select window to be added to Super Tab";
	}
	else
	{	
		var foldername=prompt("Please enter the name of Super Tab","");
		if(foldername!=null)
		{
			if(foldername)
			{ 
				for(var j=0;j<URL.length;++j)
				{
					 
					for(var i=0;i<currentURL.length;++i)
						{
							if(URL[j]==currentURL[i]){
								superTabWithId[i]=foldername;
								break;
							}
						}
					 
				}
				document.getElementById("status").style.display="block";	
				document.getElementById("status").className="label label-success";
				document.getElementById("status").innerHTML="Super Tab Created";
			}
			else
			{
				document.getElementById("status").style.display="block";	
				document.getElementById("status").className="label label-important";
				document.getElementById("status").innerHTML="Kindly Enter Name For Your SuperTab";
			}
		}
		else
		{
			document.getElementById("status").style.display="none";
		}
	var port = chrome.extension.connect({name: "knockknock"});

	port.postMessage({array:superTabWithId});
	port.onMessage.addListener(function(msg)
					{
						
					}
				);
		
	}
}

function delete_it(i){
	for(var k=0;k<superTabWithId.length;++k)
	{
		if(superTabWithId[k]==superTabNames[i])
			{
			  superTabWithId[k]=null;
			}
	}
	superTabNames[i]=null;
	var port = chrome.extension.connect({name: "knockknock"});
	port.postMessage({array:superTabWithId});
	port.onMessage.addListener(function(msg)
					{
						
					}
				);
	printforsupertab();
}
function showsupertab(i)
{
	var suptab=new Array();
	var x=0;
	var divhead = document.getElementById("links");
	var div="";
	if(!document.getElementById("contenttab"))
	{
		div = document.createElement('div');
		div.id="contenttab";
	}
	else
	{
		div = document.getElementById('contenttab');	
	}
	
	div.innerHTML="";
	div.className="row-fluid span8";
	div.style.width="63%";
	divhead.appendChild(div);
	var ul = document.createElement('ul');
	ul.className="thumbnails";
	div.appendChild(ul);
	
	for(var k=0;k<superTabWithId.length;++k)
	{
		if(superTabWithId[k]==superTabNames[i])
			{suptab[x]=k;x=x+1;}
	}
	for (var j = 0; j < suptab.length; ++j) {
		var li = document.createElement('li');
		li.className="span9 hbhavishya";
		li.style.marginLeft="2em";
		(function (j) {
				var a = document.createElement('a');
				a.className="thumbnail";
				a.href = currentURL[suptab[j]];
				
				var legend = document.createElement('label');
				legend.style.fontSize="small";
				legend.style.textAlign="center";
				legend.innerHTML=currentTitle[suptab[j]].substring(0,20)+"...";
				
				var img = document.createElement('img');
				if(currentImages[suptab[j]])
				{
					img.setAttribute('src', currentImages[suptab[j]]);
				}
				else
				{
					img.setAttribute('src',defaultImage);
				}
				img.setAttribute('alt', 'na');
				a.appendChild(legend);
				a.appendChild(img);
				a.addEventListener('click', function(){
				      onAnchorClick(suptab[j]);
				});
				li.appendChild(a);
				ul.appendChild(li);
			
		})(j);
	}
}

function showurl(i)
{
	var tab=new Array();
	var x=0;
	var divhead = document.getElementById("links");
	var div="";
	if(!document.getElementById("contenttab"))
	{
		div = document.createElement('div');
		div.id="contenttab";
	}
	else
	{
		div = document.getElementById('contenttab');	
	}
	
	div.innerHTML="";
	div.className="row-fluid span8";
	div.style.width="62%";
	divhead.appendChild(div);
	var ul = document.createElement('ul');
	ul.className="thumbnails";
	div.appendChild(ul);
	
	for(var k=0;k<tabsForBaseURL.length;++k)
	{
		if(tabsForBaseURL[k]==BaseURL[i])
			{tab[x]=k;x=x+1;}
	}

	for (var j = 0; j < tab.length; ++j) {
		var li = document.createElement('li');
		li.className="span9 hbhavishya";
		li.style.marginLeft="2em";
		(function (j) {
				var a = document.createElement('a');
				a.className="thumbnail";
				a.href = currentURL[tab[j]];
				
				var legend = document.createElement('label');
				legend.style.fontSize="small";
				legend.style.textAlign="center";
				legend.innerHTML=currentTitle[tab[j]].substring(0,30)+"...";
				
				var img = document.createElement('img');
				if(currentImages[tab[j]])
				{
					img.setAttribute('src', currentImages[tab[j]]);
				}
				else
				{
					img.setAttribute('src',defaultImage);
				}
				img.setAttribute('alt', 'na');
				a.appendChild(legend);
				a.appendChild(img);
				a.addEventListener('click', function(){
				      onAnchorClick(tab[j]);
				});
				li.appendChild(a);
				ul.appendChild(li);
			
		})(j);
	}
}

function printforsupertab()
{
	var flag=1;
	var count=0;
	var port = chrome.extension.connect({name: "knockknock"});
	superTabNames=[];
	superTabWithId=[];
	port.postMessage({joke: "supertab"});
	port.onMessage.addListener(function(msg)
					{
						for(var i=0;i<msg.array.length;i=i+1)
						{
							superTabWithId[i]= msg.array[i];
						}

						for(var i=0;i<superTabWithId.length;++i)
						{flag=1;
							if(superTabWithId[i])
								{
									for(var j=0;j<count;++j)
									{
										if(superTabWithId[i]==superTabNames[j])
											{flag=0;break;}
									}
								if(flag==1)
									{superTabNames[count]=superTabWithId[i];count=count+1;}
								}
							
						}
						var div=document.getElementById("links");
						div.className="";
						div.innerHTML="";
						flagfortab=0;
						document.getElementById('super1').className="disabled";
						document.getElementById('below').style.display="none";
						if(superTabNames.length > 0 || BaseURL.length>0)
						{
							var sidediv = document.createElement("div");
							sidediv.className="span3";
						 
							var ul = document.createElement('ul');
							ul.className="nav nav-list bs-docs-sidenav";
							ul.style.backgroundColor = '#FFF9DE';
							sidediv.appendChild(ul);
					 
							for (var i = 0; i < superTabNames.length; ++i) {
								(function (i) {
									var element = document.createElement("a"); 
									element.href= "#";
									element.addEventListener('click', function(){
										showsupertab(i);
									});
									element.innerHTML=superTabNames[i].substr(0,20) +  " " + " " + "  " + "  ";	
									
									var el = document.createElement("i");
							 
									el.className="icon-trash";
									el.addEventListener('click', function(){delete_it(i);});	
									
									var index = document.createElement("i");
									index.className="icon-chevron-right";
									element.appendChild(index);
									element.appendChild(el);
									
									var li = document.createElement('li');
									li.appendChild(element);
									ul.appendChild(li);
								})(i);
							}
							
							var ul2 = document.createElement('ul');
							ul2.className="nav nav-list bs-docs-sidenav";
							ul2.style.backgroundColor = '#F7F8FB';
							sidediv.appendChild(ul2);
							for (var i = 0; i < BaseURL.length; ++i) {
								(function (i) {
									var element = document.createElement("a"); 
									element.href= "#";
									element.addEventListener('click', function(){
										showurl(i);
									})
									element.innerHTML=BaseURL[i].substr(0,20);
									
									var index = document.createElement("i");
									index.className="icon-chevron-right";
									element.appendChild(index);
									
									var li = document.createElement('li');
									li.appendChild(element);
						    
									ul2.appendChild(li);
							
								})(i);
							}
						}
						else
						{
							document.getElementById("status").innerHTML="First Create A Super Tab";
							document.getElementById("status").style.display="block";
						}
						div.appendChild(sidediv);
  
					}
	);

}
  
function createtab(i)
{
	var newtab = new Object();
	newtab.url=closeURL[i];
	chrome.tabs.create(newtab);
}

function addbookmark(newFolder)
{
	
	for (i = 0; i < bookURL.length; i++)
	{
		chrome.bookmarks.create(
						{
							'parentId':newFolder.id,
							'title': bookTitle[i],
							'url': bookURL[i]
						}
					);
	}
	document.getElementById("status").innerHTML="";
	document.getElementById("status").className="label label-success";
	document.getElementById("status").innerHTML="Bookmark Added Successfully";
	document.getElementById("status").style.display="block";
}

function printInHtml(divName, data) {
	var div = document.getElementById(divName);
	div.innerHTML = "";
	div.className = "row-fluid";
	var ul = document.createElement('ul');
	ul.className="thumbnails";
	div.appendChild(ul);

	for (var i = 0; i < data.length; ++i) {
		var li = document.createElement('li');
	//	li.className="span5 hbhavishya";
		li.className=use+" hbhavishya";
		li.style.marginLeft="3em";
		(function (i) {
			if(currentURL[i])
			{
				var a = document.createElement('a');
				a.className="thumbnail";
				a.href = currentURL[i];
				
				var legend = document.createElement('label');
				legend.style.fontSize="small";
				legend.style.textAlign="center";
				legend.innerHTML=currentTitle[i].substring(0,spl)+" ...";
				
				var element = document.createElement("image");
				element.setAttribute('src',"delete.png");
				element.addEventListener('click',function(){
					chrome.tabs.remove(i,function(){
						getData();
					});
				});
//				legend.appendChild(element);
				var img = document.createElement('img');
				if(currentImages[i])
				{
					img.setAttribute('src', currentImages[i]);
				}
				else
				{
					img.setAttribute('src',defaultImage);
				}
				img.setAttribute('alt', 'na');
				a.appendChild(legend);
				a.appendChild(img);
			
				a.addEventListener('click', function(){
				      onAnchorClick(i);
				});
				li.appendChild(a);
				li.appendChild(element);
				ul.appendChild(li);
				
			}
		})(i);
	}
}
function book_supertab_done(i)
{
	
		var x=0;
		var foldername=superTabNames[i];
		for(var j=0;j<superTabWithId.length;++j)
		{
			if(superTabWithId[j]==foldername)
				{
					bookURL[x]=currentURL[j];
					bookTitle[x]=currentTitle[j];
					x=x+1;
				}
		}	
		if(foldername && bookURL.length>1)
		{
			chrome.bookmarks.create({'parentId':"1",'title': foldername},
						  function(newFolder)
							{
								addbookmark(newFolder);
								bookURL=[];
								bookTitle=[];
							}
						);
		}
		else
		{
			var newFolder = new Object();
			newFolder.id="1";
			addbookmark(newFolder);
			bookURL=[];
			bookTitle=[];
		}
			
}

function book_it(divName,data){
	var div=document.getElementById("links");
	div.className="";
	div.innerHTML="";
	document.getElementById('drop').style.display="none";
	var count=0;
	var flag=1;
	
	for(var i=0;i<data.length;++i)
	{flag=1;
		if(data[i])
		{
			for(var j=0;j<count;++j)
			{
				if(data[i]==superTabNames[j])
					{flag=0;break;}
			}
			if(flag==1)
			{
				superTabNames[count]=data[i];count=count+1;
			}
		}
	}
	var sidediv = document.createElement("div");
	sidediv.className="span4";
	div.appendChild(sidediv);
	var ul = document.createElement('ul');
	ul.style.marginLeft="2em";
	ul.className="nav nav-list bs-docs-sidenav ";
	ul.style.backgroundColor = '#FFF9DE';
	sidediv.appendChild(ul);
	var li2= document.createElement('li');
	li2.style.textAlign="center";
	li2.style.backgroundColor="blue";
	li2.innerHTML="supertab you have created";    
	ul.appendChild(li2);
	
	var x=0;
	var k;
	for (var i = 0; i < superTabNames.length; ++i) {
		(function (i) 
		{
			var element = document.createElement("a"); 
			element.href= "#";
			element.addEventListener('click', function(){
				book_supertab_done(i);
			});
			element.innerHTML=superTabNames[i];	
									
			var li = document.createElement('li');
			li.style.textAlign="center";
			li.appendChild(element);    
			ul.appendChild(li);
		})(i);
	}
}

function book_url(divName){
	var div=document.getElementById("links");
	var count=0;
	
	var sidediv = document.createElement("div");
	sidediv.className="span4";
	div.appendChild(sidediv);
	var ul = document.createElement('ul');
	ul.className="nav nav-list bs-docs-sidenav ";
	ul.style.backgroundColor = '#F7F8FB';
	sidediv.appendChild(ul);
	var li2= document.createElement('li');
	li2.style.textAlign="center";
	li2.style.backgroundColor="blue";
	li2.innerHTML="websites having common base url";    
	ul.appendChild(li2);
	
	var x=0;
	var k;
	for (var i = 0; i < BaseURL.length; ++i) {
		
	(function (i)
		{	
			var element = document.createElement("a"); 
			element.href= "#";
			element.innerHTML=BaseURL[i];;	
									
			var li = document.createElement('li');
			li.style.textAlign="center";
			li.appendChild(element);    
			ul.appendChild(li);

			var foldername=BaseURL[i];
			element.addEventListener('click', function(){
				x=0;
		
				for(var j=0;j<tabsForBaseURL.length;++j)
				{
					if(tabsForBaseURL[j]==foldername)
					{
						bookURL[x]=currentURL[j];
						bookTitle[x]=currentTitle[j];
						x=x+1;
					}
				}	
				if(foldername && bookURL.length>1)
				{
					chrome.bookmarks.create({'parentId':"1",'title': foldername},
									function(newFolder)
									{
										addbookmark(newFolder);
										bookURL=[];
										bookTitle=[];
									}
								);
				}
				else
				{
					var newFolder = new Object();
					newFolder.id="1";
					addbookmark(newFolder);
					bookURL=[];
					bookTitle=[];
				}
			});	
	})(i);
	}
}


function printInForm(divName,data,test){
	var div = document.getElementById(divName);
	div.innerHTML = "";
	div.className = "row-fluid";
	
	var button = document.createElement("input");
	button.className="btn btn-primary btn-large rotatewithme";
	button.type="button";
	if(test==0)
	{
		button.value="Bookmark";
		button.addEventListener('click', function(){on_book_random_button_Click();});
	}
	else
	{
		button.value="Create SuperTab";
		button.addEventListener('click', function(){supertab();});
	}
	div.appendChild(button);
	
	
	var ul = document.createElement('ul');
	ul.className="thumbnails";
	div.appendChild(ul);

	for (var i = 0; i < data.length; ++i) {
		var li = document.createElement('li');
		li.className="span5";
		li.style.marginLeft="2em";
		(function (i) {
			if(currentURL[i])
			{
				var label = document.createElement('label');
				label.className="thumbnail hbhavishya";
				label.htmlFor=i;
					
				var element1 = document.createElement("input");
				element1.type = "checkbox";
				element1.value = currentId[i]; 
				element1.id = i;
				element1.style.position = "relative";
				element1.style.left="10em";
				element1.name="arrCheck";
				
				var legend = document.createElement('label');
				legend.style.fontSize="small";
				legend.style.textAlign="center";
				legend.innerHTML=currentTitle[i].substr(0,30)+"...";
				
				var img = document.createElement('img');
				if(currentImages[i])
				{
					img.setAttribute('src', currentImages[i]);
				}
				else
				{
					img.setAttribute('src',defaultImage);
				}
				img.setAttribute('alt', 'na');
				label.appendChild(legend);
				
				label.appendChild(img);
				li.appendChild(label);
				li.appendChild(element1);
				ul.appendChild(li);
			}
		})(i);
	}
}

function printclose()
{
	var div = document.getElementById("links");
	div.innerHTML = "";
	div.className = "row-fluid";
	var ul = document.createElement('ul');
	ul.className="thumbnails";
	div.appendChild(ul);
	for (var i = 0; i < closeId.length; ++i)
	{
		var li = document.createElement('li');
		li.className="span5 hbhavishya";
		li.style.marginLeft="3em";
		(function (i)
			{
				var a = document.createElement('a');
				a.className="thumbnail"
				a.href = closeURL[i];
			
				var legend = document.createElement('label');
				legend.style.fontSize="small";
				legend.style.textAlign="center";
			
				if(closeTitle[i])
				{
					legend.innerHTML=closeTitle[i].substring(0,30)+"...";
				}
				else
				{
					legend.innerHTML=". ."+". . ";
				}
				
				var img = document.createElement('img');
				if(cls[closeId[i]])
				{
					img.setAttribute('src', cls[closeId[i]]);
				}
				else
				{
					img.setAttribute('src',defaultImage);
				}
				img.setAttribute('alt', 'na');

				a.appendChild(legend);
				a.appendChild(img);
				a.addEventListener('click', function(){
					createtab(i);
					});
				
				li.appendChild(a);
				ul.appendChild(li);
			}
		)(i);
	}

}

function getData(tab) {
	document.getElementById("kk").style.display="block";
	if(flagforbook==0 && flagfortab==0)
	{
		document.getElementById('recent1').className="disabled";
		document.getElementById('present1').className="active";
		document.getElementById('book1').className="disabled";
		document.getElementById('drop').style.display="none";
		document.getElementById('header_text').innerHTML="Opened Tabs";
		document.getElementById('super1').className="disabled";
		document.getElementById("datatable").innerHTML="";
		document.getElementById('below').style.display="none";
	}
	else if(flagforbook==1 && flagfortab==0)
	{
		document.getElementById('recent1').className="disabled";
		document.getElementById('present1').className="disable";
		document.getElementById('book1').className="active";
		document.getElementById('drop').style.display="block";
		document.getElementById('header_text').innerHTML="Bookmark";
		document.getElementById("datatable").innerHTML="";
		document.getElementById('below').style.display="none";
		document.getElementById('super1').className="disabled";
	}
	else if(flagfortab==1 && flagforbook==1)
	{
		document.getElementById('recent1').className="disabled";
		document.getElementById('present1').className="disabled";
		
		if(document.getElementById('super1').className=="active")
		{
			document.getElementById('super1').className="disabled";
			document.getElementById('book1').className="active";
			document.getElementById('drop').style.display="block";
			document.getElementById('header_text').innerHTML="Bookmark";
			document.getElementById('below').style.display="none";
		}
		else
		{
			document.getElementById('super1').className="active";
			document.getElementById('book1').className="disabled";
			document.getElementById('drop').style.display="none";
			document.getElementById('header_text').innerHTML="Super Tab";
			document.getElementById('below').style.display="block";
		}
		document.getElementById("datatable").innerHTML="";
	}
	else if(flagfortab==1 && flagforbook==0)
	{
		document.getElementById('recent1').className="disabled";
		document.getElementById('present1').className="disable";
		document.getElementById('super1').className="active";
		document.getElementById('book1').className="disabled";
		document.getElementById('below').style.display="block";
		document.getElementById('header_text').innerHTML="Super Tab";
		document.getElementById("datatable").innerHTML="";
		document.getElementById('drop').style.display="none";
	}
	

	chrome.windows.getCurrent(getWindows);
}

function getWindows(win) {
	targetWindow = win;
	chrome.tabs.getAllInWindow(targetWindow.id, getTabs);
}

function getTabs(tabs)
{
	document.getElementById('kk').style.display="active";
	var flag=1;
	tabCount = tabs.length;
	currentURL=[];
	currentId=[];
	currentTitle=[];
	currentFavicon=[];
	BaseURL=[];
	countBaseURL=0;
	for(var j=0;j<tabCount;j=j+1) {
		flag=1;
		currentURL[tabs[j].id]=tabs[j].url;
		currentId[tabs[j].id]=tabs[j].id;
		currentTitle[tabs[j].id]=tabs[j].title;
		currentFavicon[tabs[j].id]=tabs[j].favIconUrl;
		var n=currentURL[tabs[j].id].split("/");
		for(var i=0;i<countBaseURL;++i)
			{
				if(n[2]==BaseURL[i])
					{
						tabsForBaseURL[tabs[j].id]=n[2];
						flag=0;
						break;
					}
			}
		if(flag==1)
			{
				BaseURL[countBaseURL]=n[2];
				countBaseURL=countBaseURL+1;
				tabsForBaseURL[tabs[j].id]=n[2];
			}
		
		
	}
	imagecreate();
}

function recent()
{
	document.getElementById('recent1').className="active";
	document.getElementById('present1').className="disabled";
	document.getElementById('book1').className="disabled";
	document.getElementById('super1').className="disabled";
	document.getElementById('drop').style.display="none";
	document.getElementById('header_text').innerHTML="Recently Closed Tabs";
	document.getElementById("datatable").innerHTML="";
	document.getElementById("status").style.display="none";
	document.getElementById('below').style.display="none";
	document.getElementById('kk').style.display="none";

	var port = chrome.extension.connect({name: "knockknock"});
	closeId=[];
	port.postMessage({joke: "tabid"});
	port.onMessage.addListener(function(msg)
				{
				        for(var j=0;j<msg.array.length;j=j+1)
					{	
						closeId[j]=msg.array[j];
					}
				});

	var port = chrome.extension.connect({name: "knockknock"});

	port.postMessage({joke: "closed"});
	port.onMessage.addListener(function(msg)
					{
						for(var i=0;i<closeId.length;i=i+1)
						{
							cls[closeId[i]]= msg.array[closeId[i]];
						}
					});
	
	var port = chrome.extension.connect({name: "knockknock"});

	port.postMessage({joke: "title"});
	port.onMessage.addListener(function(msg)
					{
						for(var i=0;i<closeId.length;i=i+1)
						{	
							closeTitle[i]= msg.array[i];
						}
						
					});
	
	var port = chrome.extension.connect({name: "knockknock"});

	port.postMessage({joke: "url"});
	port.onMessage.addListener(function(msg)
					{
						for(var i=0;i<closeId.length;i=i+1)
						{
							closeURL[i]= msg.array[i];
						}
						printclose();
					});
}

function bookmark()
{
	if(flagforbook==1)
	{
		flagforbook=0;
	}
	else
	{
		flagfortab=0;
		flagforbook=1;
	}
	getData();
}


function tab()
{
	if(flagfortab==1)
	{
		flagfortab=0;
	}
	else
	{
		flagforbook=0;
		flagfortab=1;
	}
	getData();
}

function book_random()
{
	document.getElementById('recent1').className="disabled";
	document.getElementById('present1').className="disabled";
	document.getElementById('book1').className="disabled";
	document.getElementById('super1').className="disabled";
	document.getElementById('drop').style.display="none";
	document.getElementById('below').style.display="none";
	document.getElementById('header_text').innerHTML="Bookmark Random Tabs";
	document.getElementById("status").style.display="none";
	document.getElementById('kk').style.display="none";
	flagforbook=0;
	document.getElementById("links").innerHTML="";
	printInForm("datatable",currentURL,0);
}

function book_by_supertab()
{
	document.getElementById('recent1').className="disabled";
	document.getElementById('present1').className="disabled";
	document.getElementById('book1').className="disabled";
	document.getElementById('drop').style.display="none";
	document.getElementById('header_text').innerHTML="Bookmark The super Tabs";
	document.getElementById("status").style.display="none";
	document.getElementById('kk').style.display="none";
	flagforbook=0;
	document.getElementById("links").innerHTML="";

	var port = chrome.extension.connect({name: "knockknock"});
	
	port.postMessage({joke: "supertab"});
	port.onMessage.addListener(function(msg)
					{
						for(var i=0;i<msg.array.length;i=i+1)
						{
							superTabWithId[i]= msg.array[i];
						}
						book_it("view",superTabWithId);
						book_url("view");
					});
}

function book_by_url()
{
	document.getElementById('recent1').className="disabled";
	document.getElementById('present1').className="disabled";
	document.getElementById('book1').className="disabled";
	document.getElementById('drop').style.display="none";
	document.getElementById('header_text').innerHTML="Bookmark The super Tabs";
	document.getElementById("status").style.display="none";
	document.getElementById('kk').style.display="none";
	flagforbook=0;
	document.getElementById("links").innerHTML="";
	book_url("datatable");
}


function tab_random()
{
	document.getElementById('recent1').className="disabled";
	document.getElementById('present1').className="disabled";
	document.getElementById('super1').className="disabled";
	document.getElementById('book1').className="disabled";
	document.getElementById('below').style.display="none";
	document.getElementById('header_text').innerHTML="Super Tabs";
	document.getElementById('drop').style.display="none";
	document.getElementById("status").style.display="none";
	document.getElementById('kk').style.display="none";
	flagfortab=0;
	document.getElementById("links").innerHTML="";
	printInForm("datatable",currentURL,1);
}

function imagecreate()
{
	var port = chrome.extension.connect({name: "knockknock"});
	port.postMessage({joke: "image"});
	port.onMessage.addListener(function(msg)
					{
						for(var j=0;j<currentId.length;j=j+1)
						{
							currentImages[currentId[j]]=msg.array[currentId[j]];
						}
						printInHtml("links", currentImages);
					}
				);
}	

document.addEventListener('DOMContentLoaded',function(){
	getData();
	document.getElementById("recent").addEventListener('click',function(){ recent();});
	document.getElementById("present").addEventListener('click',function(){flagforbook=0; flagfortab=0; getData();});
	document.getElementById("book").addEventListener('click',function(){ bookmark();});
	document.getElementById("super").addEventListener('click',function(){ tab();});
	document.getElementById("book_random").addEventListener('click',function(){book_random();});
	document.getElementById("tab_random").addEventListener('click',function(){tab_random();});
	document.getElementById("show").addEventListener('click',function(){printforsupertab();});
	document.getElementById("supertab").addEventListener('click',function(){book_by_supertab();});
	document.getElementById("im1").addEventListener('click',function(){use="span2";spl=10;flagforbook=0; flagfortab=0; getData();});
	document.getElementById("im2").addEventListener('click',function(){use="span10";spl=60;flagforbook=0; flagfortab=0; getData();});
	document.getElementById("im3").addEventListener('click',function(){use="span5";spl=30;flagforbook=0; flagfortab=0; getData();});
});