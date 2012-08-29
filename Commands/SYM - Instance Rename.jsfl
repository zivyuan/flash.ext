/*
 *	元件智能改名
 *	
 *	统一更改同一图层上相关联关键帧元件的名称
 *
 */
//
function rename(){
	var sel, obj;
	var nName, nextFrame;
	sel = dom.selection.concat([]);

	if(sel.length == 0){
		fl.trace("必需选择一个影片剪辑.");
		return;
	}
	/*************************************************************/
	while(sel.length){
		obj = sel.shift();
		if(obj.elementType == "instance"){
			renameInstance(obj, "请输入元件的新名称: ")
			continue;
		}
	}
}
function renameInstance(obj, mes){
	var layer, nName, nextFrame;
	layer = obj.layer;
	nName = prompt(mes, obj.name.length > 0 ? obj.name : obj.libraryItem.name.split("/").join("_"));
	if(nName == null){
		return;
	}
	if(!(/^[\w_\$][\w_\$]*$/.test(nName))){
		fl.trace("名称不符合命名规范.");
		return;
	}
	obj.name = nName;
	//先往前查找, 前一个关键帧
	nextFrame = prevKeyFrameID(layer, tl.currentFrame);
	while(layer.frames[nextFrame]){
		if(!searchAndReplaceInFrame(layer.frames[nextFrame], obj)){
			break;
		}
		nextFrame = prevKeyFrameID(layer, nextFrame);
	}
	nextFrame = nextKeyFrameID(layer, tl.currentFrame);
	while(layer.frames[nextFrame]){
		if(!searchAndReplaceInFrame(layer.frames[nextFrame], obj)){
			break;
		}
		nextFrame = nextKeyFrameID(layer, nextFrame);
	}
}
function prevKeyFrameID(layer, cframeID){
	var kid = layer.frames[cframeID].startFrame - 1;
	return kid > -1 ? layer.frames[kid].startFrame : -1;
}
function nextKeyFrameID(layer, cframeID){
	var kid = layer.frames[cframeID].startFrame + layer.frames[cframeID].duration;
	return kid;
}
/*
 *	从选择列表里查找可用对象
 */
function searchAndReplaceInFrame(frame, obj){
	var count = frame.elements.length;
	for(var i=0;i<count;i++){
		if(frame.elements[i].libraryItem == obj.libraryItem){
			frame.elements[i].name = obj.name;
			return true;
		}
	}
	return false;
}
//////////////////////////////////////////////////////////////
var dom = fl.getDocumentDOM();
var tl = dom.getTimeline();
fl.outputPanel.clear();

rename();
