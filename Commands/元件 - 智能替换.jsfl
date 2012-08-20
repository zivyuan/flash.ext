/*
 *	元件智能改名
 *	
 *	统一更改同一图层上相关联关键帧元件的名称
 *
 */
//
function swapElement(){
	var avaiableList = /^(component|movie clip|graphic|button|bitmap|compiled clip)$/;
	var eleTypeList = /^instance$/;
	var sel, obj;
	var nName, nextFrame;
	var save_cframe = tl.currentFrame;
	//library item
	var libItem = dom.library.getSelectedItems()[0];
	var replaceCount = 0;
	sel = dom.selection.concat([]);

	//check lib item
	if(libItem == null){
		fl.trace("必须选择一个对应的库项目!");
		return;
	}
	if(!avaiableList.test(libItem.itemType)){
		fl.trace("所选择的库内容不支持替换!");
		fl.trace("  "+libItem.name);
		return;
	}

	/*************************************************************/
	//swapElements(obj, libItem);
	if(sel.length == 1){
		//
		var layer, nName, nextFrame;
		var itemID = -1;
		obj = sel[0];
		layer = obj.layer;
		if(!eleTypeList.test(obj.elementType)){
			fl.trace("对象不支持替换.");
			return;
		}
		//先往前查找, 前一个关键帧
		nextFrame = prevKeyFrameID(layer, tl.currentFrame);
		while(layer.frames[nextFrame]){
			itemID = itemInFrame(obj, layer.frames[nextFrame])
			if(itemID > -1){
				tl.currentFrame = nextFrame;
				dom.selectNone();
				dom.selection = [layer.frames[nextFrame].elements[itemID]];
				dom.swapElement(libItem.name);
			}
			nextFrame = prevKeyFrameID(layer, nextFrame);
		}
		nextFrame = nextKeyFrameID(layer, save_cframe);
		while(layer.frames[nextFrame]){
			itemID = itemInFrame(obj, layer.frames[nextFrame])
			if(itemID > -1){
				tl.currentFrame = nextFrame;
				dom.selectNone();
				dom.selection = [layer.frames[nextFrame].elements[itemID]];
				dom.swapElement(libItem.name);
			}
			nextFrame = nextKeyFrameID(layer, nextFrame);
		}
		//
		tl.currentFrame = save_cframe;
		dom.selection = [obj];
		dom.swapElement(libItem.name);
		//
	} else if(sel.length > 1){
		//
		for(var i=0;i<sel.length;i++){
			//if(sel[i].itemType
			obj = sel[i];
			if(eleTypeList.test(obj.elementType)){
				dom.selectNone();
				dom.selection = [obj];
				dom.swapElement(libItem.name);
				replaceCount ++;
			}
		}
		//
		fl.trace("共选择了 " + sel.length + " 个对象. 替换 " + replaceCount + " 个对象.");
	}else{
		fl.trace("必须选择一个可替换对象. 对象可以是 位图, 元件, 影片剪辑, 按钮");
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
 *	Frame has special item
 */
function itemInFrame(item, frame){
	var count = frame.elements.length;
	for(var i=0;i<count;i++){
		if(frame.elements[i].libraryItem == item.libraryItem){
			return i;
		}
	}
	return -1;
}

//////////////////////////////////////////////////////////////
var dom = fl.getDocumentDOM();
var tl = dom.getTimeline();
//fl.outputPanel.clear();

swapElement();
