function itemInArray(item, ary){
	for(var i=0; i<ary.length; i++){
		if(item == ary[i]) return true;
	}
	return false;
}

function lockUnselectedLayers(unlockCurrent){
	tl = fl.getDocumentDOM().getTimeline();
	selectedIDs = tl.getSelectedLayers(); 
	len = tl.layers.length;
	for(var k=0; k<len; k++){
		var layer = tl.layers[k];
		if(layer.name.indexOf("AssistLayer") == 0 || layer.layerType == "folder" || layer.layerType == "guide" || layer.layerType == "mask"){
			continue;
		}
		if(itemInArray(k, selectedIDs)){
			//if(unlockCurrent && layer.locked){
				layer.locked = false;
			//}
		}else{
			layer.locked = true;
		}
	}
}

lockUnselectedLayers(true);