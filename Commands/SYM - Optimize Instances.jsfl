/*
 *	优化对象显示
 *	
 *	设置所有选择对象坐标为整数
 *		文本:	设备字体
 *				如果没有滤镜则添加设置为0的一个模糊滤镜, 以支持透明
 *
 */
function checkAccess(){
	if(dom.selection == null){
		fl.trace("Please open a file first!");
		return;
	}
	if(dom.selection.length == 0){
		fl.trace("Please selection one or more textfield first!");
		return;
	}
	advVisual();
}
function advVisual(){
	var sel = dom.selection.concat([]);
	var slen = sel.length;
	var tt = null;
	var adj = 0;
	//unselecte all
	for(var i=0;i<slen;i++){
		sel[i].selected = false;
	}
	for(var i=0;i<slen;i++){
		tt = sel[i];
		adj = tt.elementType == "shape" ? -0.5:0;
		tt.x = Math.round(tt.x)+adj;
		tt.y = Math.round(tt.y)+adj;
		if(tt.elementType == "text"){
			tt.fontRenderingMode = "device";
			//check if textfield has at least one filter then unselecte it
			tt.selected = true;
			if(dom.getFilters().length > 0)
				tt.selected = false;
		}
	}
	if(dom.getFilters().length == 0){
		// 添加滤镜: blurFilter
		dom.addFilter('blurFilter')
		dom.setFilterProperty('blurX', 0, 0)
		dom.setFilterProperty('blurY', 0, 0)
	}
	//reslecte all
	for(var i=0;i<slen;i++){
		sel[i].selected=true;
	}
}
var dom = fl.getDocumentDOM();
//
checkAccess();
