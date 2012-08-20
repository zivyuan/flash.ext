/*
 * 按矩阵复制选择的内容
 * @author:      ziv.yuan@gmail.com
 * @date:        2010-01-11
 *
 */
var UNDEFINED;
function defaultParam(v, def){
	return (v==UNDEFINED || v==null || isNaN(v))? def : v;
}
/*
 * 矩阵复制
 *
 * @param   offsetX:Number          x 轴偏移量
 * @param   offsetY:Number          y 轴偏移量
 * @param   countX:Number           x 轴复制次数
 * @param   countY:Number           y 轴复制次数
 */
function matrixCopy(offsetX, offsetY, countX, countY){
	if(sel.length == 0){
		fl.outputPanel.clear();
		fl.trace("必须选择复制对象");
		return;
	}
	//initial params
	offsetX = defaultParam(offsetX, 10);
	offsetY = defaultParam(offsetY, 0);
	countX = defaultParam(countX, 5);
	countY = defaultParam(countY, 1);
	if((countX*countX)>500){
		var c=confirm("复制次数超过500个, 可能Flash长时间假死. 继续本次操作?");
		if(!c){
			fl.trace("复制取消!");
			return;
		}
	}
	//copy selected item(s)
	dom.clipCopy();
	for(py=0;py<countY;py++){
		for(px=0;px<countX;px++){
			if(px==py && px == 0)	continue;//忽略自身位置
			dom.clipPaste(true);
			dom.moveSelectionBy({x:px*offsetX, y:py*offsetY});
		}
	}
	fl.trace("成功复制 "+(countX*countY)+" 个对象.");
}

/*
 * the main function
 */
function main(){
	if(sel.length == 0){
		fl.outputPanel.clear();
		fl.trace("必须选择复制对象");
		return;
	}
	var setstr = prompt("请输入参数(offsetX, offsetY, repeatX, repeatY):\n", "10, 0, 5, 1");
	setstr = setstr.replace(/,[^\d,]+/g,",");
	var sets = setstr.split(",");
	matrixCopy(parseInt(sets[0]), parseInt(sets[1]), parseInt(sets[2]), parseInt(sets[3]));
}

//
var dom = fl.getDocumentDOM();
var sel = dom.selection;
//
main();