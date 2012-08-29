//stop at last frame
var tl = fl.getDocumentDOM().getTimeline();
var names = ["ActionScript", "AS", "actionscript", "as"]
var asl_id = -1;
var aslayer;
var OP_Code_Start = "\n/*****OP_CODE_START*****/\n";
var OP_Code_End = "\n/***** OP_CODE_END *****/\n";
var OP_Code_sep = "\n/***********************/\n";
var OP_Code_StopAtEnd = "\n/*** stop at end ***/\n";
//var reg = new RegExp(OP_Code_Start.split("/").join("\\/") + 
for(var i=0; i<4; i++){
	var ids = tl.findLayerIndex(names[i]);
	if(ids){
		asl_id = ids[0];
		break;
	}
}

if(asl_id == -1){
	tl.setSelectedLayers(0, true);
	tl.addNewLayer(names[0], "normal", true);
	asl_id = 0;
}

tl.setSelectedLayers(asl_id, true);
aslayer = tl.layers[asl_id];
aslayer.locked = true;
if(aslayer.frameCount < tl.frameCount){
	tl.insertBlankKeyframe(tl.frameCount - 1);
}else{
	if(aslayer.frames[aslayer.frameCount - 1].startFrame != aslayer.frameCount - 1){
		//最后一帧不是关键帧
		tl.insertBlankKeyframe(tl.frameCount - 1);
	}
}
if(aslayer.frames[aslayer.frameCount - 1].actionScript.indexOf("stop();") == -1){
	aslayer.frames[aslayer.frameCount - 1].actionScript += (OP_Code_Start + "\tstop();" + OP_Code_End);
}