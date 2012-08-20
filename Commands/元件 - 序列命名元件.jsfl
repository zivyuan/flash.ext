/*
 * 对选定的元件序列命名
 *
 *  cmd: 序列名称_###[,起始编号][,步长]
 */
function add0(num, len){
	var str = num + "";
	while(str.length < len){
		str = "0" + str;
	}
	
	return str
}
//==================================================================================//
function seriesName(){
	var sel, obj;
	var count = 1;
	var command =  prompt("请输入序列名称(instance_###):", "instance_###").split(",");
	var reg = /(#+)/;
	var nName = command[0];
	if(nName.length == 0){
		return;
	}
	if(!(/^[\w_#\$][\w_#\$]*$/.test(nName))){
		fl.trace("名称不符合命名规范.");
		return;
	}
	if(nName.indexOf("#") == -1){
		nName += "#";
	}
	var numLen = nName.match(/(#+)/)[0].length;

	sel = dom.selection.concat([]);
	sel.reverse();
	while(sel.length > 0){
		obj = sel.shift();
		if(obj.elementType == "instance"){
			obj.name = nName.replace(reg, add0(count, numLen));
			count++;
		}
	}
}

var dom = fl.getDocumentDOM();
var tl = dom.getTimeline();


seriesName();