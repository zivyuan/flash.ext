var sdoc = fl.getDocumentDOM();
var tl = sdoc.getTimeline();
//tl.setSelection
if(sdoc != undefined){
	var ndoc = fl.createDocument("timeline");
	if(ndoc == undefined){
		alert("文件创建失败!");
	}else{
		ndoc.width = sdoc.width;
		ndoc.height = sdoc.height;
		ndoc.backgroundColor = sdoc.backgroundColor
		ndoc.frameRate = sdoc.frameRate;
		ndoc.asVersion = sdoc.asVersion;
		ndoc.autoLabel = sdoc.autoLabel;
		ndoc.description = sdoc.description;
		ndoc.zoomFactor = 1;
	}
}