function _sort_up2down(a,b){
	//由上往下选, 从上往下队列
	var aa = parseInt(a);
	var bb = parseInt(b);
	return aa==bb?0:aa>bb?1:-1;
}
function _sort_down2up(a,b){
	//由下往上选, 从下往上队列
	var aa = parseInt(a);
	var bb = parseInt(b);
	return aa==bb?0:aa>bb?-1:1;
}
//
function findHead(layer, frame){
	//返回关键帧id, 如果当前不是关键帧, 则往后检索
	if(layer.frames[frame].startFrame != frame)
		if(layer.frames[frame].startFrame == 1)
			return layer.frames[frame].startFrame;
		else
			return layer.frames[frame].startFrame + layer.frames[frame].duration;
	else
		return frame;
}
function getQueueID(){
	var qlc = doc.getDataFromDocument("QueueLayerCount") + 1;
	if(isNaN(qlc))
		qlc = 0;
	doc.addDataToDocument("QueueLayerCount", "integer", qlc)
	return "QE_" + qlc;
}
function collectQueueLayers(queID){
	var reg_qe = new RegExp("^" + queID + "\\|\\d+$");
	var layers = new Array();
	var len = tl.layers.length;
	var ln = ""
	for(var i=0;i<len;i++){
		if(tl.layers[i].layerType != "normal")
			continue;
		ln = tl.layers[i].frames[0].name;
		if(reg_qe.test(ln)){
			layers.push([i, parseInt(ln.substr(ln.indexOf("|")+1))]);
		}
	}
	layers.sort(function (a,b){
		return a[1]>b[1]?1:(a[1]==b[1]?0:-1);
	});
	var re = new Array();
	for(i=0;i<layers.length;i++){
		re.push(layers[i][0]);
	}
	return re;
}
function queueLayers(tl, layers, overlay){
	var queID = getQueueID();
	var dir_b2t = false;
	var clearQE = overlay < 0;
	var len = layers.length;
	var insertframes = overlay;
	var cframe = 0;
	var tlframe = tl.currentFrame;	//保存当前帧
	var startframe = findHead(tl.layers[layers[0]], tlframe);	//帧插入起点
	
	overlay = overlay < 0 ? 0 :overlay;
	//set queue id and set.
	tl.layers[layers[0]].frames[0].name = clearQE?"":("//" + queID+"|0");
	for(i=1; i<len; i++){
		//set queue id and set.
		tl.layers[layers[i]].frames[0].name = clearQE?"":("//" + queID+"|"+i);
		//设置当前图层
		tl.setSelectedLayers(layers[i], true);
		//查找动画头
		cframe = findHead(tl.layers[layers[i]], startframe);
		insertframes = i * overlay;
		if(cframe == 0){
			//如果是第一帧, 则需要把第帧内容后移一帧再做队列. 同时应插入的帧数减1
			//扩展一帧
			tl.insertFrames(1, false, cframe);
			//转换第二帧为关键帧
			tl.convertToKeyframes(cframe+1);
			tl.clearFrames(cframe);
			insertframes --;
		}
		insertframes = (startframe + insertframes) - cframe;
		if(insertframes > 0)
			tl.insertFrames(insertframes, false, startframe-1);
		else if(insertframes < 0)
			tl.removeFrames(startframe, startframe + insertframes * -1);
	}
}
//
function checkAccess(){
	if(sl.length > 0){
		var dat = tl.layers[sl[0]].frames[0].name;
		if(dat.indexOf("QE_") == 0){
			sl = collectQueueLayers(dat.substr(0,dat.lastIndexOf("|")));
		}else{
			sl.sort(sl[0] > sl[sl.length-1] ? _sort_up2down:_sort_down2up);
		}
		if(sl.length > 1){
			var overlay = parseInt(prompt("请输入重叠帧数:", 0));
			queueLayers(tl, sl, overlay);
		}else{
			fl.trace("You need select more than one layers or select an queued layer!");
		}
	}else{
		fl.trace("You need select more than one layers or select an queued layer!");
	}
}
//
//
var doc = fl.getDocumentDOM();
var tl = doc.getTimeline();
var sl = tl.getSelectedLayers();
//main function;
checkAccess();
//如果只先择一个图层, 并且找到队列定义

