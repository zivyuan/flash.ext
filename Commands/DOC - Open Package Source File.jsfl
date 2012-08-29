/*
 *	Fast Open Script File(s)
 *	v 1.5
 *	MK-Pig	2007-12-14
 */
function toURI(s){
	if(s.indexOf("file:///") == 0 || s.indexOf("file|///") == 0){
		s = s.substr(8);
	}
	s = s.split(":").join("|").split("\\").join("/");
	if(s.lastIndexOf("/") == s.length-1)
		s = s.substr(0, s.length-1);
		
	return "file:///"+s;
}
function searchFiles(){
	//不支持 AS3 类的快速打开
	var file = fl.getDocumentDOM();
	var configPath = toURI(fl.configDirectory);
	var classPath = configPath;
	/*var flashVersion = fl.version.substr( fl.version.indexOf(" ")+1, fl.version.indexOf(",") - fl.version.indexOf(" ")-1);
	switch(flashVersion){
		case "6":
			classPath += "/Classes/mx";
			break;
		case "7":
			classPath += "/Classes/FP7";
			break;
		case "8":
			//默认为 AS2
			classPath += "/Classes/FP8";
			break;
		default:
			fl.trace("打开脚本文件: "+flashVersion);
	}*/
	/* get class path*/
	switch(file.asVersion){
		case "1":
			break;
		case "2":
			classPath += "/Classes/FP8";
			break;
		case "3":
	}
	var files = new Array();
	var tmpPaths = fl.packagePaths.split(";");
	var paths = new Array();
	var docPath = "";
	if(file.path)
		docPath = file.path.substr(0, file.path.lastIndexOf("\\"));

	for(var i=0; i<tmpPaths.length; i++){
		if(docPath != "" && tmpPaths[i]=="." ){
			paths.push(toURI(docPath));
		}else if(docPath != "" && (tmpPaths[i].indexOf("./") == 0 || tmpPaths[i].indexOf(".\\") == 0)){
			paths.push(toURI(docPath + tmpPaths[i].substr(1)));
		}else if(tmpPaths[i] == "$(LocalData)/Classes"){
			paths.push(classPath);
		}else{
			paths.push(toURI(tmpPaths[i]));
		}
	}
	paths.push(configPath + "/include");
	//parse string to find file name;
	var as = fl.actionsPanel.getSelectedText().split("\r\n");
	
	var fname = "";
	var isInclude = false;
	var isPack = false;
	var tmp = null;
	for(var i=0; i<as.length; i++){
		var f = "";
		var ft = "file";
		
		/*fname = "";
		tmp = null;
		isInclude = as[i].indexOf("include") == 1 || as[i].indexOf("\\") > -1 || as[i].indexOf("/") > -1 || as[i].indexOf("\"") > -1;
		if(isInclude){
			tmp = as[i].split("\"");
			if(tmp[0] == "" || tmp[0].indexOf(" ") > -1)
				tmp.shift();
			fname = tmp[0];
		}
		isPack = as[i].indexOf("t ") > -1 || as[i].indexOf(";") > -1;
		if(isPack){
			var s = as[i].indexOf("t ") > -1 + 2;
			var e = 
			fname = as[i]
		}*/

		if(as[i].indexOf("#include")>-1){
			var t = as[i].split("\"");
			if(t[1].indexOf(".as")>-1){
				f = t[1];
			}else{
				f = t[1] + ".as";
			}
		}else if(as[i].indexOf("import")>-1){
			f = as[i].substr(as[i].indexOf(" ")+1);
			if(f.indexOf(";")>-1){
				f=f.substr(0, f.length-1);
			}
			if(as[i].indexOf("*") > -1)	{
				ft = "folder";
			}else{
				f = f.split(".").join("/")+".as";
			}
		}else{
			var comer = as[i].lastIndexOf("\"");
			if(comer > -1){
				if(comer == as[i].length-1){
					var s = as[i].indexOf("\"");
					if(s > -1 && s != comer)
						f = as[i].substr(s+1, comer - s -1);
					else
						f = as[i].substr(0, comer);
				}else{
					f = as[i].substr(comer+1);
				}
				if(f==".as"){
					f="";
				}else{
					if(f.indexOf(".as") != f.length-3 || f.length < 3){
						f += ".as";
					}
				}
			}else{
				if(as[i].indexOf(".") > 0){
					f = as[i].split(" ").join("");
					if(f.indexOf(";")>-1){
						f=f.substr(0, f.length-1);
					}
					f = f.split(".").join("/")+".as";
				}
			}
		}
		if(f!="")
			files.push({uri:f, source:as[i], type:ft});
	}
	//open file(s)
	openFiles(paths, files);
}
function openFiles(p, f){
	if(f.length == 0){
		alert("选区中没有找到文件!")
		return ;
	}
	var lost = new Array();
	for(var j=0; j<f.length; j++){
		var found = false;
		var file = "";
		for(var k=0; k<p.length; k++){
			if(f[j].uri.indexOf(":") == -1){
				file = p[k] + "/" + f[j].uri;
			}else{
				file = "file:///" + f[j].uri.split(":").join("|").split("\\").join("/");
			}
			if(FLfile.exists(file)){
				fl.openScript(file);
				found = true;
				//continue;
			}
		}
		if(!found){
			lost.push("文件打开失败! 源: " + f[j].source);
		}
	}
	var lc = lost.length;
	if(lc > 0)
		fl.trace("\r>> Fast Open Script: " + lc + " file"+(lc>1?"s are":" is")+" lost.\r>>" + lost.join("\r>>") + "\r");
}
function open(furi){
	if(FLfile.exists(furi)){
		fl.openScript(furi);
		fl.trace("open file[T]: "+furi);
		return true;
	}else{
		fl.trace("open file[F]: "+furi);
		return false;
	}
}
//
if(fl.actionsPanel.hasSelection()) 
	searchFiles();
else 
	alert("没有选择脚本!");
