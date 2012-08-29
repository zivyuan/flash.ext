var tl = fl.getDocumentDOM().getTimeline();
var layer = tl.layers[tl.currentLayer];
var key = layer.frames[tl.currentFrame].startFrame + layer.frames[tl.currentFrame].duration;

if(key < layer.frames.length){
	tl.currentFrame = key;
	tl.setSelectedFrames(key, key+1);
}else{
	//goto last frame
	tl.currentFrame = layer.frames.length-1;
	tl.setSelectedFrames(tl.currentFrame, tl.currentFrame+1);
}
