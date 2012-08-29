function createLabels(fid, fname){
	var e = fid + duration;
	if(layer.frames[fid].startFrame != fid)
		tl.insertBlankKeyframe(fid);
	layer.frames[fid].name =fname;
	if(layer.frames[e].startFrame != e)
		tl.insertBlankKeyframe(e);
	layer.frames[e].actionScript = "stop();\n";
}
//
var tl = fl.getDocumentDOM().getTimeline();
var names=new Array("_norOver", "_norPress", "_norRelease", "_norOut", "_norDisable", "_togOver", "_togPress", "_togRelease", "_togOut", "_togDisable");
var duration = 10;
var sframe = 5;//prompt("请输入起始帧: ", 5);
var totalFrames = names.length*15+sframe;

tl.currentLayer = 0;
if(tl.findLayerIndex("ActionScript") == undefined)
	tl.addNewLayer("ActionScript", "normal", true);
tl.currentLayer = 0;
if(tl.findLayerIndex("Label") == undefined)
	tl.addNewLayer("Label", "normal", false);

var lidx = tl.findLayerIndex("Label")[0];
var layer = tl.layers[lidx];
layer.locked = true;

if(layer.frames.length < totalFrames)
	tl.insertFrames(totalFrames-layer.frames.length, true, layer.frames.length-1);
	
//重新定位图层
tl.setSelectedLayers(lidx, true);

if(layer.frames[2].startFrame != 2)
	tl.insertBlankKeyframe(2);
layer.frames[2].actionScript = "stop();\n";

for(i=0; i<names.length;i++){
	createLabels(i*15 + sframe, names[i]);
}