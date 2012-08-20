var tl = fl.getDocumentDOM().getTimeline();
var layer = tl.layers[tl.currentLayer];
var startframe = layer.frames[tl.currentFrame].startFrame;

if(startframe == tl.currentFrame && tl.currentFrame > 0){
	startframe = layer.frames[tl.currentFrame-1].startFrame;
}
tl.currentFrame = startframe >=0 ? startframe:0
tl.setSelectedFrames(tl.currentFrame, tl.currentFrame+1);
