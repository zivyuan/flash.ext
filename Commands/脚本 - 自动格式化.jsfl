/*
 *    Flash 脚本格式化工具
 *    
 *
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
/*
 *  调用外部 JSFL 功能
 * @param     fun:String         文件及函数名称. 例如 ziv.math.cos 表示位于 ziv/目录下, 文件 math.jsfl 里的 cos 函数
 * @param     ...:Array          传递的参数, 任意多
 */
function calljs($fun){
	var ldot = $fun.lastIndexOf(".");
	var fun = $fun.substr(ldot+1);
	var jsfl = fl.configDirectory + "Commands/" + $fun.substr(0,ldot).replace(/\./g,"\\") + ".jsfl";
	var arg = [toURI(jsfl), fun]
	for(i=1;i<arguments.length;i++){
		arg.push(arguments[i]);
	}
	return fl.runScript.apply(this, arg);
}
/*
 * 获取完整的 XML 字串
 */
getFullXML = function (source, nodeName, startIdx) {
	var nodeEnd = "</" + nodeName + ">";
	var idxs, idxsp, idxs2, idxe, idxep, idxe2;
	var result = "";

	idxs = getXMLElementStartIndex(source, nodeName, startIdx);
	idxe = source.indexOf(nodeEnd, idxs);
	if(idxe == -1 || idxs == -1){
		/*	元素没有正确结束	*/
		return null;
	}
	idxsp = idxs;
	idxep = idxe;
	while (idxsp != -1 && idxep != -1) {
		idxs2 = getXMLElementStartIndex(source, nodeName, idxsp + 1);
		idxe2 = source.indexOf(nodeEnd, idxep + 1);
		/*
		 *这里主要处理如下情况:
		 *<Commands id="2"><Commands id="2"/></Commands>
		 */
		if (idxs2 < idxep && idxe2 == -1) {
			result = source.substr(idxs, idxep - idxs + nodeEnd.length);
			break;
		}
		/*
		 *正常情况
		 *<Commands id="2"><Commands id="2"></Commands></Commands>
		 */
		if (idxs2 > idxep || idxs2 == -1) {
			result = source.substr(idxs, idxep - idxs + nodeEnd.length);
			break;
		}
		idxsp = idxs2;
		idxep = idxe2;
	}
	return result;
}
getXMLElementStartIndex = function (str, nodeName, sidx) {
	var node = "<" + nodeName;
	var nodeLen = node.length;
	var idx = str.indexOf(node, sidx ? sidx : 0);
	var flag = "", flags = " >/";
	while (idx > -1) {
		flag = str.charAt(idx + nodeLen);
		if (flags.indexOf(flag) > -1) {
			break;
		}
		idx = str.indexOf(node, idx + nodeLen);
	}
	return idx;
};
//
/*************************************************************************************************************/
//
//
function getAction(){
	return _tl.layers[_tl.currentLayer].frames[_tl.currentFrame].actionScript;
}
function setAction(nas){
	_tl.layers[_tl.currentLayer].frames[_tl.currentFrame].actionScript = nas;
}
/*
 *	替换掉代码里的 字串/注释/正则等内容
 */
function getThinAction(){
	var as = getAction().replace(/[\r\n]+/g, "\n");
	as = as.replace(_reg_comment, 	function (a,b,c,d){
										var re = "$$_COMMENT_"+_code_comments.length+"_$$"
										_code_comments.push(a);
										return re;
									});
	as = as.replace(_reg_string, 	function (a,b,c,d){
										var re = "$$_STRING_"+_code_strings.length+"_$$"
										_code_strings.push(a);
										return re;
									});
	if(_asVersion == 3){
		as = as.replace(_reg_regexp, 	function (a,b,c,d){
											var re = "$$_REGEXP_"+_code_regexps.length+"_$$"
											_code_regexps.push(a);
											return re;
										});
		/* fix XML */
		var reg_tag = /<(\w+)([ \t].*>|>)/g;
		var idx = 0;
		var rep = "";
		var tag = reg_tag.exec(as);
		while(tag != null){
			idx = reg_tag.lastIndex - tag[0].length;
			xml = getFullXML(as, tag[1], idx);
			if(xml == null){
				//XML 标记出错
				as = null;
				fl.trace("XML错误. 请检查代码.");
				break;
			}
			rep = "$$_XML_"+_code_xmls.length+"_$$";
			as = as.substr(0, idx) + rep + as.substr(idx + xml.length);
			_code_xmls.push(xml);
			//设置下一个搜索起点
			reg_tag.lastIndex = idx + rep.length-1;
			tag = reg_tag.exec(as);
		}
	}
	//清除行首空格
	as = as.replace(/\n[\t ]*/g, "\n");
	return as;
}
/*
 *	还原代码
 */
function repareAction(as){
	if(_asVersion == 3){
		fl.trace("restore xml...");
		//优先还原 XML. 因为 XML 中可能嵌套其他内容. 正则或者字串
		as = as.replace(/\$\$_XML_(\d+)_\$\$/g, function (a,b,c,d){
												return _code_xmls[parseInt(b)];
											});
	}
	as = as.replace(/\$\$_([A-Z]+)_(\d+)_\$\$/g, 	function (a,b,c){
														var str = ""
														switch(b){
															case "STRING":
																str = _code_strings[parseInt(c)];
																break;
															case "COMMENT":
																str = _code_comments[parseInt(c)];
																break;
															case "REGEXP":
																str = _code_regexps[parseInt(c)];
																break;
														}
														return str;
													});
	return as;
}
//
function startFormator(){
	var _action = getThinAction();
	if(_action != null){
		fl.trace(_action);
	}else{
		return;
	}

	codes = _action.split("\n");
	fl.trace(codes);
}
//
//
//
fl.outputPanel.clear();
var JSLib_PATH = toURI(fl.configDirectory) +"/Commands";
//格式化过程中将忽视  注释, 字串, xml
var _code_comments = new Array;
var _code_strings = new Array;
var _code_regexps = new Array;
var _code_xmls = new Array;
//
var _reg_comment = /\/\*[\w\W]*?\*\/|\/\/.*/g;
var _reg_string = /""|(["']).*?[^\\]\1|''/g;
var _reg_regexp = /\/[^*\/].*\//g;
var _reg_xml = /<(.+)>.*?<\/\1>|<(.+).*\/>/g;
//
var _operation = {};
var _ident = "";
//
var _asVersion = fl.getDocumentDOM().asVersion;
//run time global vars.
var _tl = fl.getDocumentDOM().getTimeline();

startFormator();
