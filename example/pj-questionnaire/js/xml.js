window.onload = function(){
	var file="xml/list.xml";
	loadXml(file);
	console.log(xmlDoc);
	document.write(xmlDoc);
}


function loadXml(file){
	try //Internet Explorer  
	{  
	 xmlDoc=new ActiveXObject("Microsoft.XMLDOM");  
	 xmlDoc.async=false;  
	 xmlDoc.load(file);  
	}  
	catch(e)  
	{  
	 try //Firefox, Mozilla, Opera, etc.  
	 {  
	  xmlDoc=document.implementation.createDocument("","",null);  
	  xmlDoc.async=false;  
	  xmlDoc.load(file);  
	 }  
	 catch(e)  
	 {  
	  try //Google Chrome  
	  {  
	   var xmlhttp = new window.XMLHttpRequest();  
	   xmlhttp.open("GET",file,false);  
	   xmlhttp.send(null);  
	   xmlDoc = xmlhttp.responseXML.documentElement;  
	  }  
	  catch(e)  
	  {  
	   error=e.message;  
	  }  
	 }  
	}  

}

function setXmlDoc(){
	var nodeList= xmlDoc.documentElement.getElementsByTagName("area"); // IE  
	for(var i=0;i<nodeList.length;i++){  
	    //...遍历操作...  
	}  
	  
	var nodeList=xmlDoc.getElementsByTagName("area");  // 非IE  
	for(var i=0;i<nodeList.length;i++){  
	    //...遍历操作...  
	}  	
}
