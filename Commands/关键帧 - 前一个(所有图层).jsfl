var tl = fl.getDocumentDOM().getTimeline();
var key = 0;
var klayers = new Array();

if(tl.currentFrame > key){
	for(var j=0; j<tl.layers.length; j++){
		var sf = 0;
		var layer = tl.layers[j]
		if(tl.currentFrame <= layer.frames.length && layer.layerType != "folder"){
			sf = layer.frames[tl.currentFrame].startFrame;
			if(sf == tl.currentFrame)
				sf = layer.frames[tl.currentFrame - 1].startFrame;
		}else if(layer.layerType != "folder"){
			sf = layer.frames[layer.frames.length - 1].startFrame;
		}
		if(sf > key){
			klayers = [j];
			key = sf;
		}else if(sf == key){
			klayers.push(j);
		}
	}
	if(key > 0){
		//防止第一帧时选择所有帧
		tl.setSelectedLayers(klayers[0], true);
		for(var j=1; j<klayers.length; j++)
			tl.setSelectedLayers(klayers[j], false);
	}
	tl.currentFrame = key;
	tl.setSelectedFrames(tl.currentFrame, tl.currentFrame+1);
}
