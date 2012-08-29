/*
 *	Flash IDE 的 package 自动导入工具
 *	version 1.61
 *	ziv.yuan
 *	ziv.yuan@gmail.com
 */


/*
 * 调用公共库
 * 所有公共库必需存放在 ziv.package 目录下
 * 
 * @param  funname:String     调用的库名和方法名. 格式: [公共库名.]方法名;
 *                            如果省略库名则采用 common.jsfl
 */
function run(funname){
	var dot = funname.indexOf(".");
	var lib = dot == -1 ? "common.jsfl" : (funname.substr(0, dot) + ".jsfl");
	var fun = dot == -1 ? funname : funname.substr(dot + 1);
	var par = [_path_lib + lib, fun];
	for(var i=1; i<arguments.length; i++)
		par.push(arguments[i]);
	var re;
	try{
		re = fl.runScript.apply(null, par);
	}catch(e){
		alert("方法 " + lib + " > " + fun + " 没有定义!");
		re = null;
	}
	return re;
}
var _path_lib = fl.configURI + "zTools/v0.1/lib/";
var _path_conf = fl.configURI + "zTools/v0.1/";

function dtrace(msg){
	if(!cleared){
		fl.outputPanel.clear()
		cleared = true;
	}
	fl.trace(msg);
}
var cleared = false;
/*
 *	清除数组里重复内容, 返回一个新的数组
 */
function util_array_clearRepeat(a){
	if(!a)	return [];
	var re = [];
	var len = a.length;
	
	var repeat= false;
	for(i=0;i<len;i++){
		for(j=0;j<i;j++){
			repeat = re[j] == a[i];
			if(repeat)
				break;
		}
		if(!repeat)
			re.push(a[i]);
	}
	return re;
}
/*
 *	
 */
function toURI(s){
	return run('toURI', s);
}
/*
 *	自动从指定文件夹收集 package 信息
 */
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
/*
 *
 */
function getSystemLanguage(){
	var reg=/\\(\w+)\\Configuration\\/;
	reg.test(fl.configDirectory);
	return RegExp.$1;
}
/******************************************************************************************/
/*
 *	收集所有类名
 */
function _collectClassNames(_as){
	_as = _as+"   ";
	var _reg_comment = /\/\*[\w\W]*?\*\/|\/\/.*/g;
	var _reg_string = /""|(["']).*?[^\\]\1|''/g;
	var _reg_regexp = /\/[^*\/].*\//g;
	var _reg_xml = /<(.+)>.*?<\/\1>|<(.+).*\/>/g;
	//
	var _reg_class = /[^\w\.][A-Z]\w*/g;
	var names = [], tmp=[];
	//清除代码里的注释
	_as = _as.replace(_reg_comment, "");
	//清除代码里的字串表达式
	_as = _as.replace(_reg_string, "");

	//如果是 AS3, 还要清除 正则表达式 和 XML 定义
	if(fl.getDocumentDOM().asVersion == 3){
		//清除代码里的正则表达式
		_as = _as.replace(_reg_regexp, "");
		//清楚代码里的XML对象
		//  目前缺陷: 当对象定义里包内含了与根同名节点时无法正确清除 XML 对象
		//		  如:	<root><root>level 2</root></root>
		_as = _as.replace(/[\r\n]+/g, "\"enter\"");
		_as = _as.replace(_reg_xml, "");
		_as = _as.split("\"enter\"").join("\n");
		//由于 AS3 的包引用机制, 导致以AS2时代的全局方法也要使用 import, 而方法的命名规则又不同于类名, 所以在检查的时候要单独检查
		var _as3functions = FLfile.read(toURI(fl.configDirectory)+"/Commands/AS3Functions.txt");
		if(_as3functions != null && _as3functions.length > 0){
			_as3functions = _as3functions.replace(/[ \t]+/g, "").replace(/[\r\n]+/g, "|");
			tmp = _as.match(new RegExp("[^\\w](" + _as3functions + ")[ \\t]*\\(", "g"));
			if(tmp)
				names = tmp;
		}
	}
	//修正当类出现在代码最开始时无法正确识别的错误
	_as = " "+_as;
	tmp = _as.match(_reg_class);
	if(tmp)
		names = names.length > 0 ? names.concat(tmp) : tmp;
	names = (","+names).replace(/,[^\w,]*(\w+)[^\w,]*/g, ",$1").split(",");
	names.shift();
	return util_array_clearRepeat(names);
}
/*
 *	根据不同语言版本加载对应配置
 */
function _loadPackageSets(){
	var file = fl.configURI+"Commands/";
	var lc = "";
	switch(fl.getDocumentDOM().asVersion){
		case 2:
			file += "AS2Package.txt";
			break;
		case 3:
			file += "AS3Package.txt";
			break;
		default:
			dtrace(_lan.Err_Unsurport);
			return null;
	}
	if(FLfile.exists(doc_localPackage)){
		lc = FLfile.read(doc_localPackage).replace(/[\r\n \t]+/g, _flag + _flag) + _flag;
	}
	if(FLfile.exists(doc_localPackageSRC)){
		lc += FLfile.read(doc_localPackageSRC).replace(/[\r\n \t]+/g, _flag + _flag) + _flag;
	}
	if(FLfile.exists(file))
		//将所有信息以两个连续的 _flag 连接, 并在首尾加上 _flag
		return _flag + lc + FLfile.read(file).replace(/[\r\n \t]+/g, _flag + _flag) + _flag;
	else{
		dtrace(_lan.Err_FileMiss);
		return "";
	}
}
function _savePackageSets(sets){
	var file = toURI(fl.configDirectory)+"/Commands/";
	switch(fl.getDocumentDOM().asVersion){
		case 2:
			file += "AS2Package.txt";
			break;
		case 3:
			file += "AS3Package.txt";
			break;
		default:
			dtrace(_lan.Err_Unsurport);
			return null;
	}
	FLfile.write(file, sets.replace(/,+/g, _newline).replace(new RegExp("^["+_flag+"\\r\\n \\t,]+"), ""));
}
function _getPackageSetsFile(){
	var file = toURI(fl.configDirectory)+"/Commands/";
	switch(fl.getDocumentDOM().asVersion){
		case 2:
			file += "AS2Package.txt";
			break;
		case 3:
			file += "AS3Package.txt";
			break;
		default:
			dtrace(_lan.Err_Unsurport);
			return null;
	}
	if(FLfile.exists(file)){
		return file;
	}else{
		return _lan.Err_FileMiss;
	}
}
/*
 *	自动完成包应用信息
 */
function _organizeImports(a,c,p){
	var count = c.length;
	var t_reg = null;
	var tmp = null;
	var imports = [];
	var empty = /[\t \r\n]+/;
	var commer = /,/g;
	var className = "";

	while(c.length > 0){
		className = c.shift();
		if(className == "" || className == null){
			continue;
		}
		//如果这个类是顶级类则跳过
		if (p.indexOf(_flag+className+_flag)>-1) {
			continue;
		}
		
		t_reg = new RegExp(_flag+"[a-z][^,]+\\."+className+_flag, "gm");
		tmp = p.match(t_reg);

		if (tmp) {
			//:>   2009-11-12
			//这里用于清除出现的重复定义, 目前不清楚为什么会出现这个BUG
			tmp = util_array_clearRepeat(tmp);
			if (tmp.length == 1) {
				imports.push("import "+tmp[0].replace(commer, ""));
			} else {
				//当有超过1个以的包时提示选择
				imports.push("import "+switchPackage(tmp));
			}
		} else {
			errors.push("  > "+_lan.Err_NotFound + className + ".");
		}
	}
	if (errors.length > 0) {
		dtrace(_lan.Err_Missing);
		dtrace(errors.join("\r"));
	}
	return imports;
}
/*
 *	手动选择要导入的包
 *	当一个类名对应多个包时要求手动选择包
 */
function switchPackage(paks){
	//创建 XMLUI 界面
	var xml = new Array;
	var commer = /,/g;

	//创建 XML 界面
	xml.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<dialog title=\"" + _lan.PackageSelect + "\" buttons=\"accept\" >\n\t<radiogroup id=\"selectedPackage\">");
	xml.push("\t\t<radio selected=\"true\" label=\"" + paks[0].replace(commer, "") + "\" />");
	for(i=1;i<paks.length;i++){
		xml.push("\t\t<radio label=\"" + paks[i].replace(commer, "") + "\" />");
	}
	xml.push("\t</radiogroup>\n</dialog>");
	FLfile.write(_xmlui, xml.join("\n"));
	
	var v = fl.getDocumentDOM().xmlPanel(_xmlui);
	return v.selectedPackage;
}
/*
 *	清理代码. 移除由于自动导入操作产生的多行空白
 */
function clearAction(as){
	as = as.replace(/^(\/\/[ \t]*)$/gm,"");
	//将代码里两行以上的空行压缩为两行
	as = as.replace(/(\r\n[ \t]*)\1+/g,"\r\n\r\n");
	return as.replace(/[\r\n \t]*/,"");
}
/*
 *	扩展命令
 *	支持 添加,删除条目
 */
function _doCommand(cmds){
	var pak_append = new Array;
	var pak_remove = new Array;
	var packs = _loadPackageSets();
	var ispackage = /^[\w\.\*\?\+\\]+$/;
	var needsave = false;
	packs = _flag + packs.replace(/[\r\n]+/g, _flag);

	var cmd, cname, cpara;
	var idx = 0, treg;
	while(cmds.length>0){
		cmd = cmds.shift();
		idx = cmd.indexOf(" ");
		if(idx == -1){
			cname = cmd.substr(2);
			cpara = "";
		}else{
			cname = cmd.substr(2, idx-2);
			cpara = cmd.substr(idx+1);
		}
		
		switch(cname.toLowerCase()){
			case "+":
			case "add":
				if(packs.indexOf(_flag + cpara) == -1){
					//如果在库里没有找到则添加
					if(ispackage.test(cpara))
						pak_append.push(cpara);
				}
				break;
			case "-":
			case "remove":
				if(packs.indexOf(_flag + cpara) > -1){
					//如果在库里找到则删除
					if(ispackage.test(cpara))
						pak_remove.push(cpara.replace(/\./g, "\\."));
				}
				break;
			case "+f":
			case "addf":
				//添加 function
				// ::+f setTimeout flash.utils[.setTimeout]
				break;
			case "-f":
			case "removef":
				//删除 function
				// ::-f setTimeout
				break;
			case "++":
			case "package":
			case "pak":
				//从指定文件夹获取 package 信息, 并转换为命令
				var ppath = fl.browseForFolderURL(_lan.PackageFolderSelect);
				if(ppath){
					var ps = searchPackage(ppath, "");
					//因为要检查是否存在重复条目, 所以自动生成添加命令
					var str = "::+ "+ps.join(",::+ ");
					cmds = cmds.concat(str.split(","));
				}
				break;
			case "edit":
			case "view":
				//打开配置文件, 手动配置
				fl.openScript(_getPackageSetsFile());
				break;
			case "reg-":
			case "regremove":
				//用正则表达式移除条目
				cpara = cpara.replace(/([^\\])\./g, "$1\\.");
				treg = new RegExp(_flag + cpara + _flag, "g");
				packs = packs.replace(treg, "");
				needsave = true;
				break;
			case "local":
				//检查与fla文件同位置的Classes目录
				var cpath = doc_path + "Classes";
				if(FLfile.exists(cpath)){
					var lp = searchPackage(cpath, "");
					FLfile.write(doc_localPackage, lp.join(_newline));
				}
				break;
			case "localsrc":
				//检查与fla文件同位置的Classes目录
				var cpath = doc_path + "src";
				if(FLfile.exists(cpath)){
					var lp = searchPackage(cpath, "");
					FLfile.write(doc_localPackageSRC, lp.join(_newline));
				}
				fl.trace(lp);
				break;
			case "?":
			case "help":
			default:
				//输出帮助
				dtrace(_lan.HELP.join("\n"));
		}
	}
	//执行删除命令
	if(pak_remove.length > 0){
		var reg = _flag + "(" + pak_remove.join("|") + ")" + _flag;
		packs = packs.replace(new RegExp(reg, "g"), "");
		needsave = true;
	}
	//执行添加命令
	if(pak_append.length > 0){
		packs += pak_append.join(_flag);
		needsave = true;
	}
	
	//保存配置
	if(needsave){
		var tmp = packs.replace(new RegExp(_flag+"+","g"), _flag).split(_flag);
		//分组
		var f = "top level", f2 = "";
		var len = tmp.length, idx = -1;
		tmp.sort();
		for (var i=1; i<len; i++) {
			idx = tmp[i].indexOf(".");
			f2 = idx > -1 ? tmp[i].substr(0, idx) : "top level";
			if (f2 != f) {
				tmp[i] = _newline + tmp[i];
				f = f2;
			}
		}
		_savePackageSets(tmp.join(_newline));
	}
}
//****************************************************************************************************************
var _language = getSystemLanguage().toLowerCase();
var _lan = {};
var _tl = fl.getDocumentDOM().getTimeline();
var _frame = _tl.layers[_tl.currentLayer].frames[_tl.currentFrame];
var _xmlui = fl.configURI+"Commands/ziv.xmlui/autopackui.xml";
//fla 文档所在目录
var doc_path = run('getPath', run('toURI', fl.getDocumentDOM().path));
var doc_localPackage = doc_path +"Classes/LocalPackage.txt";
var doc_localPackageSRC = doc_path +"src/LocalPackage.txt";
var REG_ALL_COMMAND = /^\:\:[a-zA-Z\+\-\?_]+(?: .+)?/gm;
var _newline = fl.version.indexOf("WIN") == -1 ? "\r" : "\r\n";
var _flag = ",";
//
var action="",classes=[], packages="", imports = [];
var errors = [];
var appendVars = [];
var deleteVars = [];

//
/** 语言定义 **/
if(_language == "zh_cn"){
	_lan = {
		PackageSelect:"请选择要导入的类",
		PackageFolderSelect:"请选择类包所在的文件夹:",
		Err_NotFound:"无法找到类定义 ",
		Err_Missing:"类定义丢失列表:",
		Err_Unsurport:"当前脚本版本不支持类导入.",
		Err_FileMiss:"无法找到类配置文件!\n请使用 ::? 命令查看使用方法",
		HELP:[	"*********** 包引用管理脚本命令列表 ***************************",
				"*",
				"*              命令 |  功能",
				"* ---------------------------------------------------------",
				"*             +/add    添加一条 package 信息.",
				"*            ++/pak    通过搜索类文件夹添加 package 信息.",
				"*             local    搜索与fla文件同级的Classes文件夹添加.",
				"*          -/remove    删除一条 package 信息.",
				"*    reg-/regremove    使用正则表达式删除 package 信息.",
				"*         edit/view    显示与当前 AS 版本相符的配置文件路径.",
				"*            ?/help    显示命令列表.",
				"*",
				"************************************************************"]
	}
}else{
	_lan = {
		PackageSelect:"Select a class to import:",
		PackageFolderSelect:"Select the package folder:",
		Err_NotFound:"! Can not find class define: ",
		Err_Missing:"The following class(s) was/were missing.",
		Err_Unsurport:"Package is unsurported by this version.",
		Err_FileMiss:"Package config file was missing!",
		HELP:[	"********* Package Organizer Help Center *****************************",
				"*",
				"*           Command |  Function",
				"* ---------------------------------------------------------",
				"*             +/add    Directly add a package.",
				"*            ++/pak    Batch add package by search a folder.",
				"*             local    Search the folder Classes witch location with the .fla file.",
				"*          -/remove    Directly remove a package.",
				"*    reg-/regremove    Remove a package by RegExp rule.",
				"*         edit/view    Show config file path with current version of AS.",
				"*            ?/help    Show help.",
				"*",
				"************************************************************"]
	}
}
/******
*****************************************************************************************************************
******/
/*********************/
//搜索命令并执行. 目前支持添加/删除单个类定义
var cmds = _frame.actionScript.match(REG_ALL_COMMAND);
if(cmds){
	_doCommand(cmds);
	_frame.actionScript = (_frame.actionScript + "\r\n").replace(REG_ALL_COMMAND, "");
}
//获取脚本, 并清理脚本里已经存在的 import 信息
action = _frame.actionScript.replace(/^import .+$/gm, "");
//收集并清理类名
classes = _collectClassNames(action);
//收集到类名后执行导入过程
if (classes.length > 0) {
	//加载配置
	packages = _loadPackageSets();
	if(packages.length > 0){
		var imports = _organizeImports(action, classes, packages);
		if(imports.length > 0){
			if (imports.length > 0) {
				//字母排序
				imports.sort();
				//根据包名第一段分类
				var f = imports[0].substr(0, imports[0].indexOf(".")), f2 = "";
				var len = imports.length;
				for (var i=1; i<len; i++) {
					f2 = imports[i].substr(0, imports[i].indexOf(".")) ;
					if (f2 != f) {
						imports[i] = "//\r\n"+imports[i];
						f = f2;
					}
				}
				//_frame.actionScript = imports.join(";\r\n")+";\r\n//\r\n" + action;
				action = imports.join(";\r\n")+";\r\n//\r\n" + action;
			}
		}
	}
}

//清理脚本. 操作产生的多余的空行
_frame.actionScript = clearAction(action);
//
