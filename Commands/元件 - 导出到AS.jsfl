/*
 * 将时间轴命名对象导出到AS
 * ziv.yuan@gmail.com
 * 2009-10-19
 */
function exportToAS(){
	var sel=dom.selection.concat([]);
	var len=sel.length;
	var oname="",oclass,reg_class=/(\w+\.)*/;
	var declare=[];
	for(var i=0;i<len;i++){
		fl.outputPanel.trace(sel[i].name+" : "+sel[i].elementType);
		oname = sel[i].name;
		switch(sel[i].elementType){
			case "instance":
				switch(sel[i].libraryItem.itemType){
					case "button":
						oclass="SimpleButton";
						break;
					case "component":
					case "movie clip":
					case "compiled clip":
						oclass=sel[i].libraryItem.linkageClassName;
						if(oclass==undefined){
							oclass="MovieClip";
						}else{
							oclass=oclass.replace(reg_class,"")
						}
						break;
					default:
				}
				break;
			case "text":
				// fl.outputPanel.trace(":: text> "+sel[i].textType);
				if(sel[i].textType=="static"){
					continue;
				}
				oclass="TextField";
				break;
			default:
				continue;
		}
		declare.push(getDeclare(oname,oclass));
	}
	//
	if(declare.length>0){
		fl.outputPanel.clear();
		fl.outputPanel.trace(declare.join("\n"));
	}
}
function getDeclare(name,type){
	return "public var "+name+":"+type+";";
}
function getDefine(name,type){
	return "_"+name+" = "+type+"(getChildByName(\""+name+"\"));";
}


var dom = fl.getDocumentDOM();
var tl = dom.getTimeline();

exportToAS();
