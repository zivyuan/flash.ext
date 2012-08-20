/*
 * 应用程序发布管理
 *
 * @Author              ziv.yuan(ziv.yuan@gmail.com)
 * @CreateDate
 * @Version             v1.0
 * @Introduce
 *                      自动生动版本号到 AS 文件
 *                      通过时间轴指令(::)设定/修改版本号
 *                      每次发布时自动更新build_number(编译版本号)
 *
 *                      该系统采用 GNU 风格版本号: 主版本号.子版本号[.修正版本号[.编译版本号]]
 *                      所有数据存储在 fla 文件中
 */

/*
 * 加载公共库到特定空间, 默认加载到全局空间
 * 所有公共库必需存放在 ziv.package 目录下
 *
 * @param  libname:String     公共库名
 * @param  ns:Object          公共库挂载空间
 *
 */
function loadLib(lib, ns){
	var ns = ns || __lib_ns;
	var fun = FLfile.read(_path_lib + ((/\.jslf$/).test(lib) ? lib : (lib + ".jsfl")));
	if(fun && fun.length > 0){
		eval.apply(ns, [fun]);
	}else{
		alert("公共库 "+lib+" 加载失败.\n请确认文件存在并且有访问权限.");
	}
}
var __lib_ns = this;

/**********************************************************/
/*                                                        */
/**********************************************************/

var _path_lib = fl.configURI + "Commands/ziv.package/";
var _path_conf = fl.configURI + "Commands/ziv.configs/";
var _path_xmlui = fl.configURI + "Commands/ziv.xmlui/";
//
var dom = fl.getDocumentDOM() || alert("没有文档或当前文档不支持本操作");
var tl = dom ? dom.getTimeline() : null;

/**********************************************************/

function getEmptyConfig(){
	return {
		//是否启用
		enabled:true,
		//版本号管理创建时间
		createDate:getCurrentTime(),
		//最后修改时间
		lastModify:getCurrentTime(),
		//AS 类文件保存地址。TODO: 尝试使用相对路径
		file:"",
		//文件标识. 用于识别fla和as文件
		id:createIdentity(),
		//主版本号
		major:0,
		//次版本号
		minor:1,
		//修正版本号
		revision:0,
		//编译版本号
		build:0,
		//扩展版本号. 如 alpha, beta 等
		extend:"",
		//版本号自动升级基准线
		minor_up:99999,
		revision_up:99999,
		build_up:99999,
		//发布/测试前是否自动保存文件
		autoSave:true,
		//当 as 文件里的版本号和 fla 里的版本号发生冲突时使用哪个数据源
		//  允许的值:
		//    0 -> 一直提示
		//    1 -> 使用 fla 文档数据
		//    2 -> 使用 as 文档数据
		dataSource:0,
		//是否需要测试影片.默认为生成版本号并自动测试影片
		testMovie:true
	};
}
/*
 * 创建文件标识. 用来识别 fla 和 版本号关系
 */
function createIdentity(){
	var len = 16;
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321abcdefghijklmnopqrst";
	var charl = chars.length;
	var id = "";
	while(id.length < len){
		id += chars.charAt(Math.ceil(Math.random()*charl));
	}
	return id;
}

/*
 * 更新 版本号 到文件
 */
function updateVersionToAS(file, ver){
	var reg = /(const |get )(createDate|lastModify|major|minor|revision|build|extend)(\(\)\:|\:)(int|String|Number)( = | \{[\r\n\t ]+return ).+;/g;
	var regmate = /\[@([a-zA-Z0-9\-]+):(.*)]/g, mate = {"vm-version":"ver "+APP_VERSION, "fla-filename":dom.name};
	var content = FLfile.read(file);
	var c_id = new RegExp("\\[@identity:" + ver.id + "\\]","");
	if(!c_id.test(content)){
		//两个标识不一至, 提示是否重写
		if(!confirm("fla文档标识与AS文档标识不符, 是否覆盖?\n   是 -> 覆盖文件\n   否 -> 选择文件")){
			//移除当前文件关联, 重新匹配文件
			vconf.file = "";
			setConfig(APP_NAME, vconf);
			main();
			return;
		}
		//替换现有文档里的文档标识
		//content = content.replace(/\[identity\:.+\]/, "[identity:"+ver.id+"]");
		mate.identity = ver.id;
	}
	//更新metadate
	content = content.replace(regmate, function (a,b,c){
		if(mate[b]){
			return "[@" + b + ":" + mate[b] + "]";
		}else{
			return "[@" + b + ":" + c + "]";
		}
	});
	content = content.replace(reg, function (a,b,c,d,e,f){
		if(e == "String"){
			return b + c + d + e + f +"\"" + ver[c] + "\";";
		}else{
			return b + c + d + e + f + ver[c] + ";";
		}
	});
	//update modify date to file comment
	content = content.replace(/@Last Modify\:([ \t]*).*/, "@Last Modify:$1" + ver.lastModify);
	//find class name >
	var reg_class = /class ([\w\.]+\.)*(\w+)([ \t\r\n]*\{)/;
	var ca = content.match(reg_class);
	while(ca.length == 0 || ca === null){
		//没有找到类名, 提示是否需要重建类文件
		if(!prompt("在AS文件中没有找到类定义, 是否重建类文件?")){
		}
		break;
	}
	var cn_old = ca[2] || "";
	var cn_new = getFile(file).replace(/\.as$/i, "");
	if(cn_old != cn_new){
		//修改主函数
		content = content.replace(new RegExp("function " + cn_old + "([^\w])"), "function " + cn_new + "$1");
		//修改类声明
		content = content.replace(reg_class, "class $1" + cn_new + "$3");
	}
	//保存脚本
	FLfile.write(file, content);
}

/*
 * 从文件中获取版本号
 */
function getVersionFromFile(file){
	var reg, v, ver = null,vn;
	var as = FLfile.read(file);
	if(dom.asVersion == 2){
		//for as 2
		reg = /function get (createDate|lastModify|major|minor|revision|build|extend)\(\):(?:String|Number)[\{\r\n\t ]+return "?(.+)"?;/gm;
	}else if(dom.asVersion == 3){
		//for as 3
		reg = /const (createDate|lastModify|major|minor|revision|build|extend):(?:String|int) = "?(.+);/gm;
	}else{
		return {};
	}
	//
	v = as.match(reg);
	if(v && v.length > 0){
		ver = {};
		for(var i=0;i<v.length;i++){
			vn = v[i].replace(reg, "$1=$2").split("=");
			switch(vn[0]){
				case "major":
				case "minor":
				case "revision":
				case "build":
					ver[vn[0]] = parseInt(vn[1]);
					break;
				default:
					ver[vn[0]] = vn[1].replace(/^"|"$/g,"");
			}
		}
	}
	return ver;
}

/**
 * 比较两个版本号
 *
 * @param  ver1:Object            版本号1
 * @param  ver1:Object            版本号2
 * @param  ext:Number             [0-4]
 *                                0 -> 只比较主版本号
 *                                1 -> 比较次版本号
 *                                2 -> 比较修正版本号
 *                                3 -> 比较编译版本号
 *                                4 -> 比较扩展版本号
 *
 * @return  Number
 *     1  ->  ver1 > ver2
 *     0  ->  ver1 = ver2
 *    -1  ->  ver1 < ver2
 */
function compareVersion(ver1, ver2, ext){
	ext = ext || 0;
	if(ver1.major > ver2.major)return 1;
	if(ver1.major < ver2.major)return -1;
	if(ext > 0 && ver1.minor > ver2.minor)return 1;
	if(ext > 0 && ver1.minor < ver2.minor)return -1;
	if(ext > 1 && ver1.revision > ver2.revision)return 1;
	if(ext > 1 && ver1.revision < ver2.revision)return -1;
	if(ext > 2 && ver1.build > ver2.build)return 1;
	if(ext > 2 && ver1.build < ver2.build)return -1;
	if(ext > 3 && ver1.extend != ver2.extend)return -2;
	return 0;
}

function ver2str(ver1, ext){
	if(ext === false){
		return ver1.major+"."+ver1.minor+"."+ver1.revision+" build-"+ver1.build;
	}else{
		return ver1.major+"."+ver1.minor+"."+ver1.revision+" build-"+ver1.build+(ver1.extend != "" ? " " + ver1.extend : "");
	}
}
/*
 * UI 界面
 */
function _ui_firstuse(){
	//创建 XMLUI 界面
	//var xml = new Array;
	//xml.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<dialog title=\"版本号管理器\" buttons=\"accept\" >\n\t<radiogroup id=\"initialType\">");
	//xml.push("\t\t<radio selected=\"true\" label=\" 选择位置创建 Version.as\" value='1' />");
	//xml.push("\t\t<radio label=\" 从文件导入版本号\" value='2' />");
	//xml.push("\t\t<radio label=\" 不对版本号管理\" value='3' />");
	//xml.push("\t</radiogroup>\n</dialog>");
	//FLfile.write(_path_xmlui + "version_manager.xml", xml.join("\n"));
	var v = fl.getDocumentDOM().xmlPanel(_path_xmlui + "version_manager.xml");
	return v.initialType;
}
/*
 * 选择将要使用的版本号
 */
function _ui_switchVersion(ver1, ver2){
	var xml = new Array;
	xml.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<dialog title=\"请选择将要使用的版本号\" buttons=\"accept\" >\n\t<radiogroup id=\"version\">");
	xml.push("\t\t<radio selected=\"true\" label=\"fla.ver " + ver2str(ver1, true) + "\" value='0' />");
	xml.push("\t\t<radio label=\" as.ver " + ver2str(ver2, true) + "\" value='1' />");
	xml.push("\t</radiogroup>\n</dialog>");
	FLfile.write(_path_xmlui + "version_manager_ver.xml", xml.join("\n"));
	var v = fl.getDocumentDOM().xmlPanel(_path_xmlui + "version_manager_ver.xml");
	return v.version;
}

function testMovie(){
	trace(">>>> TESTING file <<<<");
	return;
	dom.testMovie();
}

function main(){
	var vfile, vmajor, vminor, vrev, vbuild, vid;
	//强制保存文件
	if(dom.path == undefined){
		fl.trace("如果您需要使用版本号管理功能请先保存文件.\n避免些提示可以在脚本里输入 //>vm_enabled false");
		testMovie();
		return;
	}
	//先检查指令, 如果禁用则直接配置参数结束返回
	var vm_enabled = getCommand(cmds, "vm_enabled");
	if(vm_enabled == "false"){
		vconf.enabled = false;
		testMovie();
		setConfig(APP_NAME, vconf);
		return;
	}else if(vm_enabled == "true"){
		vconf.enabled = true;
	}
	//如果被禁用则测试文档并返回
	if(!vconf.enabled){
		testMovie();
		return;
	}
	//检查是否存在文档
	if(vconf.file == ""){
		//此fla文件还没有配置过版本号管理器 或之前与之关联的文件丢失
		switch(parseInt(_ui_firstuse())) {
			case 1:
				trace("请选择文件存储位置,取消选择则使用与fla文件相同的路径.");
				vfile = fl.browseForFolderURL("请选择存放版本号的文件夹(不选择则在fla同目录下创建):");
				if(vfile === null){
					vfile = getPath(toURI(dom.path)) + "Classes/";
				}else{
					vfile = vfile + "/";
				}
				trace("位置: "+toURL(vfile));
				var cn;
				do{
					cn = prompt("请指定类名:", "Version");
				}while(cn == "" || cn === null);
				vfile += toURI(cn + ".as").substr(8);
				break;
			case 2:
				var asfile = /\.as$/i;
				do{
					vfile = fl.browseForFileURL("select", ">> 请选择 AS 文件 <<");
					if(vfile !== null && !asfile.test(vfile)){
						alert("请重新选择一个 AS 文件.");
						vfile = null;
					}
				}while(vfile === null);
				vconf.file = vfile;
				break;
			case 3:
				//不进行版本号管理, 测试文件并返回
				vconf.enabled = false;
				setConfig(APP_NAME, vconf);
				trace("您已经关闭了版本号管理功能. 如需重新开启请在脚本窗口输入:\n//>vm_enabled true");
				testMovie();
			default:
				//no selection, do nothing
				return;
		}
		vconf.file = vfile;
	}
	//校验文件是否存在
	if(!FLfile.exists(vconf.file)){
		alert("与文件关联的版本号文件丢失!\n按确定将重新配置版本号文件.");
		vconf.file = "";
		setConfig(APP_NAME, vconf);
		//restart flow
		main();
		return;
	}
	// TODO:: 校验文件关联是否正确
	//if(!validateIdentify())
	//	return;
	// TODO::校验版本是否一致
	var fver = getVersionFromFile(vconf.file);
	var comp = compareVersion(vconf, fver, 4);
	if(comp != 0){
		if(_ui_switchVersion(vconf, fver) == 1){
			//使用 AS 文件里的版本更新
			vconf = objCombine(vconf, fver);
		}else{
			//使用fla文件里的配置, 不用修改
		}
	}else{
		//版本号一致
	}

	//auto increase ver number
	vconf.build ++;
	if(vconf.build >= vconf.build_up){
		vconf.build = 0;
		vconf.revision ++;
	}
	if(vconf.revision >= vconf.revision_up){
		vconf.revision = 0;
		vconf.minor ++;
	}
	if(vconf.minor >= vconf.minor_up){
		vconf.minor = 0;
		vconf.major ++;
	}
	vconf.lastModify = getCurrentTime();
	//save new version to file
	setConfig(APP_NAME, vconf);
	//更新 AS 文件
	updateVersionToAS(vconf.file, vconf);
	//test movie
	dom.testMovie();
	//output current version
	//trace("ver " + ver2str(vconf, true));
}

//
//////////////////////////////////////////////////////////////////////////////////////
//
//应用程序名称, 用于管理配置
var APP_NAME = "version_number_manager";
var APP_VERSION = "0.1.2";
var vconf = getEmptyConfig();
var cmds;

loadLib("json");
loadLib("common");
loadLib("script");

if(dom){
	vconf = getConfig(APP_NAME, vconf);
	cmds = getCommands(fl.actionsPanel.getText());
	setScript(removeCommands(fl.actionsPanel.getText()));

	main();
}