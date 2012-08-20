function itemInArray(item, ary){
	for(var i=0; i<ary.length; i++){
		if(item == ary[i]) return true;
	}
	return false;
}

function toggleLock(){
	tl = fl.getDocumentDOM().getTimeline();
	len = tl.layers.length;
	for(var k=0; k<len; k++){
		var layer = tl.layers[k];
		if(layer.name.indexOf("AssistLayer") == 0 || layer.layerType == "folder" || layer.layerType == "guide" || layer.layerType == "mask"){
			continue;
		}
		layer.locked = !layer.locked;
	}
}

toggleLock();