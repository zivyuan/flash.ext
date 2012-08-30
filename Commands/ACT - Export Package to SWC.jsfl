function searchPackage(folder){
	var pk = arguments[1]||"";
	var folders = FLfile.listFolder(folder, "directories");
	var files = FLfile.listFolder(folder, "files");
	var str = "";
	var pak = new Array();
	while(files.length > 0){
		str = files.shift();
		if(_sp_reg_asFile.test(str)){
			pak.push(pk+str.replace(_sp_reg_getClass, ""));
		}
	}
	while(folders.length > 0){
		str = folders.shift();
		if(_sp_reg_packFolder.test(str)){
			pak = pak.concat(searchPackage(folder + "/" + str, pk+str+".", "flag"));
		}
	}
	
	return pak;
}
var _sp_reg_asFile = /^[A-Z]\w+\.as$/;
var _sp_reg_getClass = /\.as$/i;
var _sp_reg_packFolder = /^\w+$/;



var ppath = fl.browseForFolderURL("please select package folder...");
if(ppath){
	var paks = searchPackage(ppath);
	var str = 'import '+paks.join(";\nimport ")+";\n";
	fl.trace(str);
	for(var i=0;i<paks.length;i++){
		fl.trace(paks[i].substr(paks[i].lastIndexOf(".")+1)+";");
	}
}
