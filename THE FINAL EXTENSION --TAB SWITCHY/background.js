var defaultImage = "Untitled.jpg";
var imageData = new Array();
var closeImage = new Array();
var allUrl = new Array();
var closeId = new Array();
var closeUrl = new Array();
var count = 0;
var superTabWithId = new Array();
var allTitle=new Array();
var closeTitle=new Array();

chrome.windows.getCurrent(getWindows);

function getWindows(win) {
	
	chrome.tabs.getAllInWindow(win.id, getTabs);
}

function getTabs(tabs)
{
	for(var j=0;j<tabs.length;j=j+1) {
		allUrl[tabs[j].id]=tabs[j].url;
		allTitle[tabs[j].id]=tabs[j].title;
	}
}

chrome.tabs.onUpdated.addListener(updatefunction);

chrome.tabs.onCreated.addListener(createfunction);

chrome.tabs.onActivated.addListener(activatefunction);

chrome.tabs.onRemoved.addListener(removefunction);

function updatefunction(tabid,info,tab)
{
	if(tab.url)
	{
		allUrl[tabid]=tab.url;
		allTitle[tabid]=tab.title;
	}
	chrome.tabs.captureVisibleTab(null, imagefunction);
	function imagefunction(img)
	{
		if(img)
		{
			imageData[tabid] = img;
		}
		else
		{
			imageData[tabid] = defaultImage; 
		}
	}
}

function createfunction(tab)
{
	allUrl[tab.id]=tab.url;
	allTitle[tab.id]=tab.title;
	chrome.tabs.captureVisibleTab(null, imagefunction);
	function imagefunction(img)
	{
		if(img)
		{
			imageData[tab.id] = img;
		}
		else
		{
			imageData[tab.id] = defaultImage; 
		}
	}
}

function activatefunction(info)
{
	chrome.tabs.captureVisibleTab(null, imagefunction);
	function imagefunction(img)
	{
		if(img)
		{
			imageData[info.tabId] = img;
		}
		else
		{
			imageData[info.tabId] = defaultImage;
		}
	}
}

function removefunction(tabid)
{
	var fl=0;				
	for(var i in closeUrl){
		if(allUrl[tabid]==closeUrl[i]){
			fl=1;
			break;
		}
	}
	if(fl==0){
		if(allUrl[tabid]!="chrome://newtab/"){
			closeUrl[count] = allUrl[tabid];
			closeTitle[count]=allTitle[tabid];
			closeId[count]=tabid;
			superTabWithId[tabid]="";
			count=count+1;
			closeImage[tabid]=imageData[tabid];
		}
	}
	delete imageData[tabid];
}

chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		if(msg.joke=="image")
			port.postMessage({array:imageData});
		
		else if(msg.joke=="closed")
			port.postMessage({array:closeImage});
		
		else if(msg.joke=="url"){
			port.postMessage({array:closeUrl});
		}
		
		else if(msg.joke == "tabid")
			port.postMessage({array:closeId});

		else if(msg.joke == "title"){
			port.postMessage({array:closeTitle});	
		}
		else if(msg.joke == "supertab")
			port.postMessage({array:superTabWithId}); 
		else{
			superTabWithId=[];
			for(var i=0; i<msg.array.length; ++i)
				{
					if(msg.array[i])
					superTabWithId[i]=msg.array[i];	
				}
			count=count+1;	
			port.postMessage({joke:"Received"}); 						
		}		
	});
});