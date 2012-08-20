function add0(n, len){
	n = n+"";
	if (n.length < len) {
		n = "0"+n;
	}
	return n;
}

function getTime(d){
	if(typeof d=="undefined")
		d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	
	return add0(h,2)+":"+add0(m,2)+":"+add0(s,2);
}
function formatPath(ps){
	ps = ps.substr(8);
	ps = ps.split("|").join(":").split("/").join("\\");
	return ps + "\\";
}

function replaceLibItem(_lib, _source, _target){
	var spath = _source.substr(0, _source.lastIndexOf("/"));
	var tpath = _target.substr(0, _target.lastIndexOf("/"));
	var tname = _target.substr(_target.lastIndexOf("/")+1)
	_lib.selectItem(_source);
	_lib.renameItem(tname);
	_lib.moveToFolder(tpath, spath.length > 1 ? spath+"/" : "" + tname, true);
}

function createFolder2(fname){
	if(!FLfile.exists(fname)){
		FLfile.createFolder(fname);
	}
}

function saveLastProject(){
	var pset = new Array();
	pset.push("projectPath=" + projectPath);
	pset.push("picturePath=" + picturePath);
	pset.push("ISSUE=" + ISSUE);
	pset.push("totalPage=" + pageTotal);
	
	FLfile.write(modelPath + "/magazine.ini", pset.join("&"));
}
/*
 *	创建首页和 XML 配置文件
 */
function createIndexs(){
	//
	//=======================================================================
	//			更新 index 文件
	//=======================================================================
	//
	var file, lib;
	var swf = projectPath + "/Publish/online/index_online.swf";

	fl.openDocument(modelPath + "/Index.fla");
	file = fl.getDocumentDOM();
	lib = fl.getDocumentDOM().library
	//更新封面封底图片
	if(FLfile.exists(picturePath + "/Cover_Back.jpg")){
		file.importFile(picturePath + "/Cover_Back.jpg", true);
		replaceLibItem(lib, "Cover_Back.jpg", "CoverSettings/pic_Back");
	}else{
		fl.trace(":: file lost > "+picturePath + "/Cover_Back.jpg");
	}
	if(FLfile.exists(picturePath + "/Cover_Front.jpg")){
		file.importFile(picturePath + "/Cover_Front.jpg", true);
		replaceLibItem(lib, "Cover_Front.jpg", "CoverSettings/pic_Front");
	}else{
		fl.trace(":: file lost > "+picturePath + "/Cover_Front.jpg");
	}
	
	fl.trace(getTime() + " > "+swf);
	//发布SWF
	file.exportSWF(swf, true);
	fl.closeDocument(file,false);
}

function createPages(){
	//
	//=======================================================================
	//			更新 pages
	//=======================================================================
	//
	//检查文件
	var big,small;
	var file, lib, swf;
	var lostList = new Array();
	
	//创建 XML 配置文件
	var xmlStr = new Array();
	var page = "";
	xmlStr.push("<version>online v2.0</version>");
	xmlStr.push("<pages>");
	xmlStr.push("\t<page name=\"封  面\" type=\"swf\"></page>");
	xmlStr.push("\t<page name=\"扉  页\" type=\"swf\">pages/01.swf</page>");
	
	fl.openDocument(modelPath + "/page.fla");
	file = fl.getDocumentDOM();
	for(var i=0; i<pages.length; i++){
		lostList = new Array();
		big = picturePath + "/" +  pages[i] + ".jpg";
		small = picturePath + "/" + pages[i] + "_small.jpg";
		swf = projectPath + "/Publish/online/Pages/"+pages[i]+".swf";
		if(!FLfile.exists(big)){
			lostList.push(":: file lost > " + big);
		}
		if(!FLfile.exists(small)){
			lostList.push(":: file lost > " + small);
		}
		if(lostList.length==0){
			//无文件丢失, 导出SWF
			file = fl.getDocumentDOM();
			lib = fl.getDocumentDOM().library;
			
			file.importFile(big, true);
			lib.selectItem(pages[i] + ".jpg");
			lib.renameItem("pic_Big");
			lib.getSelectedItems()[0].quality = 95;
			lib.moveToFolder("Replace", "pic_Big", true);

			file.importFile(small, true);
			lib.selectItem(pages[i] + "_small.jpg");
			lib.renameItem("pic_Small");
			lib.getSelectedItems()[0].quality = 95;
			lib.moveToFolder("Replace", "pic_Small", true);
			
			file.exportSWF(swf, true);
			fl.trace(getTime() + " > "+swf);
		}else{
			fl.trace(":: export false > " + swf);
			fl.trace(" --> " + lostList.join("\r\n"));
		}
		//配置 XML
		if(i>0){
			page = "\t<page name=\"第 " +pages[i]+ " 页\" type=\"swf\">pages/"+pages[i]+".swf</page>";
			xmlStr.push(page);
		}
	}
	//配置 XML
	xmlStr.push("\t<page name=\"封  底\" type=\"swf\"></page>");
	xmlStr.push("</pages>");
	//set ISSUE
	xmlStr.push("<issue>" + ISSUE +"</issue>");
	//confirm
	if(lostList.length > 0){
		if(!confirm("发现有 " + lostList.length + " 个文件丢失, 是否继续?")){
			return;
		}
	}
	fl.closeDocument(file,false);
	//当模式为完整导出时才创建配置文件
	if(exportMode == 3){
		//保存配置文件 online
		FLfile.write(projectPath + "/Publish/online/pages.xml", xmlStr.join("\n"));
		//保存配置文件 offline
		xmlStr[0] = "<version>offline v2.0</version>";
		FLfile.write(projectPath + "/Publish/offline/pages.xml", xmlStr.join("\n"));
	}
}

function createProjection(){
	//创建一个新的项目. 目录结构
	createFolder2(projectPath + "/Publish");
	createFolder2(projectPath + "/Publish/online");
	createFolder2(projectPath + "/Publish/offline");
	createFolder2(projectPath + "/Publish/online/Pages");
	createFolder2(projectPath + "/Publish/online/js");
	
	FLfile.copy(modelPath + "/swfobject.js", projectPath + "/Publish/online/js/swfobject.js");
	FLfile.copy(modelPath + "/Index.html", projectPath + "/Publish/online/Index.html");
}

function portForSWF(_exportMode_, totalPage, publishDate, pageIDs, paths){
	//
	var expm = ["", "仅导出 Index", "仅导出指定页面", "导出完整项目"];
	exportMode = Number(_exportMode_);
	pageTotal = Number(totalPage);
	ISSUE = publishDate+" 邮发代号：82-158";
	pages = pageIDs.split(",");
	
	var tmpPath = paths.split("<>");
	modelPath = tmpPath[0] + "/Magazine";
	projectPath = tmpPath[1];
	picturePath = tmpPath[2];
	
	if(confirm("项目位置:  " + formatPath(projectPath) + "\n图片位置:  " + formatPath(picturePath) + "\n\n导出模式:  " + expm[exportMode] + "\n\n    页数:  共 " + pageTotal + " 页  修改 " + pages.length +" 页\n\n发布日期:  " + ISSUE)){
		createProjection();
		saveLastProject();
		fl.outputPanel.clear();

		switch(exportMode){
			case 1:
			//仅导出 Index
				createIndexs();
				break;
			case 2:
			//仅导出页面
				createPages();
				break;
			case 3:
			//导出完整项目
				createIndexs();
				createPages();
				break;
		}
		
		fl.trace("杂志发布完成. \n位于: " + projectPath + "/Publish/");
		fl.outputPanel.save(projectPath + "/Publish/Publish.log", false, false);
		return true;
	}
	return false;
}

/*********************************************
		Initial Program
*********************************************/
//
var mp_version = "1.0.5";
var projectPath = null;
var picturePath = null;
var path_publish = null;
var modelPath = null;
var exportMode = 3;
var pageTotal = 1
var pages = new Array();
var ISSUE = null;
var abort = false;
