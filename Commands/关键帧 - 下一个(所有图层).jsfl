var tl = fl.getDocumentDOM().getTimeline();
var key = tl.frameCount - 1;
var klayers = new Array();

if(tl.currentFrame < key){
	for(var j=0; j<tl.layers.length; j++){
		if(tl.currentFrame <= tl.layers[j].frames.length && tl.layers[j].layerType != "folder"){
			var dura = tl.layers[j].frames[tl.currentFrame].duration;
			if(dura == 0)
				dura = tl.layers[j].frames[tl.currentFrame + 1].duration + 1;
			var sf = tl.layers[j].frames[tl.currentFrame].startFrame + dura;
			if(sf < tl.layers[j].frames.length){
				if(sf < key){
					klayers = [j];
					key = sf;
				}else if(sf == key){
					klayers.push(j);
				}
			}
		}
	}
	if(klayers.length > 0){
		if(tl.layers[klayers[0]].frames[key].startFrame == key){
			tl.setSelectedLayers(klayers[0], true);
			for(var j=1; j<klayers.length; j++)
				tl.setSelectedLayers(klayers[j], false);
			tl.currentFrame = key;
			tl.setSelectedFrames(key, key+1);
		}
	}		
}
