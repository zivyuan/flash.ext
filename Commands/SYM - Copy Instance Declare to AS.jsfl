/*
 * 将时间轴命名对象导出到AS
 * ziv.yuan@gmail.com
 * 2009-10-19
 */
function exportToAS(){
	var sel=dom.selection.concat([]);
	var len=sel.length;
	var oname="",oclass,reg_class=/(\w+\.)*/;
	var declare=[],imp=[];
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
							if(imp.indexOf(oclass)==-1)
								imp.push(oclass);
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
		var declare = declare.join("\n");
		var impstr = 'import ' + imp.join(';\nimport ') + ';\n';
		fl.outputPanel.clear();
		fl.trace(impstr + '\n' + declare);
		fl.clipCopyString(impstr + '\n' + declare);
	}
}

function getDeclare(name,type){
	return "public var "+name+":"+type+";";
}



var dom = fl.getDocumentDOM();
var tl = dom.getTimeline();

exportToAS();
