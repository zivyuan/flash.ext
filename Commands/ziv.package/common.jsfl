/**
 * Flash JSFL 通用函数库
 *
 * @Date:                2010-01-18
 * @LastModfied:         2010-04-24
 * @Author:              ziv.yuan
 * @E-Mail:              ziv.yuan@gmail.com
 *
 */

function trace(){
	var s="";
	for(var i=0;i<arguments.length;i++)	s+=arguments[i]+",";
	fl.trace(s.substr(0,s.length-1));
}
/*
 * 将 URL 格式字串转换成 URI 格式字串
 *
 * @param   url:String                   URL 格式字串
 *
 * @return  String                       URI 格式字串
 */
function toURI(url){
	if(url.indexOf("file:///") == 0 || url.indexOf("file|///") == 0){
		url = url.substr(8);
	}
	url = url.split(":").join("|").split("\\").join("/");
	if(url.lastIndexOf("/") == url.length-1)
		url = url.substr(0, url.length-1);

	return encodeURI("file:///"+url);
}

/*
 * 将 URI 格式字串转换成 URL 格式字串
 *
 * @param   uri:String                   URI 格式字串
 *
 * @return  String                       URL 格式字串
 */
function toURL(uri){
	uri=decodeURI(uri);
	if(uri){
		uri = uri.split("|").join(":").split("/").join("\\");
		uri = uri.replace(/^file[:\|]\\\\\\|\\$/, "");
	}else{
		uri = "";
	}
	return uri;
}

function getPath(uri){
	uri = uri.split("\\").join("/");
	if(/\w+\.\w+$/.test(uri)){
		return uri.substr(0, uri.lastIndexOf("/")+1);
	}else{
		return uri;
	}
}

function getFile(uri){
	if(uri.indexOf("/") > -1){
		return uri.substr(uri.lastIndexOf("/")+1);
	}else{
		return uri.substr(uri.lastIndexOf("\\")+1);
	}
}
/*
 * 获取当前文件的发布设置
 *
 * @param   profileName:String           配置文件名. 如果省略则表示当前活动的配置文件
 *
 * @return  String                       XML formated string
 */
function getProfile(profileName){
	var doc=fl.getDocumentDOM();
	var profilePath = fl.configURI + "profileassist.xml";
	var oldprofile=doc.currentPublishProfile;

	if(profileName=="" || profileName==null){
		profileName = oldprofile;
	}else{
		for(var i=0;i<doc.publishProfiles.length;i++){
			if(doc.publishProfiles[i] == profileName){
				break;
			}
		}
		if(i==doc.publishProfiles.length){
			fl.trace("没有找到配置文件");
			return;
		}
	}

	doc.currentPublishProfile = profileName;
	doc.exportPublishProfile(profilePath);
	doc.currentPublishProfile = oldprofile;

	return (FLfile.read(profilePath));
}

/*
 * 获取当前时间戳
 *
 * @param  o_date:Date          日期. 默认为系统当前日期
 * @param  dateOnly:Boolean     是否只包含日期
 *
 */
function getCurrentTime(o_date, dateOnly){
	var td = o_date || new Date();
	var time = td.getFullYear();
	time += "-" + strComplete(td.getMonth()+1, 2);
	time += "-" + strComplete(td.getDate(), 2);
	if(dateOnly == "false" || !dateOnly){
		time += " " + strComplete(td.getHours(), 2);
		time += ":" + strComplete(td.getMinutes(), 2);
		time += ":" + strComplete(td.getSeconds(), 2);
	}
	return time;
}

/*
 * 自动补充完成字串
 *
 * @param  str:String         字串
 * @param  len:Number         长度
 * @param  char:String        用于填充的字符
 * @param  before:Boolean     是否填充在前面。默认填充在前
 */
function strComplete(str, len, char, before){
	str = str + "";
	len = str.length > len ? 0 : (len - str.length);
	char = char || "0";
	if(before !== false){
		while(len-->0){
			str = char + str;
		}
	}else{
		while(len-->0){
			str += char;
		}
	}
	return str;
}

/*
 * 自动转换字串到特定数据类型
 *
 * @param  str:String         待转换的字串
 *
 */
function strAutoValue(str){
	if(typeof str != "string")return str;
	if (str.toLowerCase() == "true") return true;
	if (str.toLowerCase() == "false") return false;
	if (str == "NULL")return null;
	if (str == "UNDEFINED")return undefined;
	if (str == "NaN")return NaN;
	if (str == "Infinity")return Infinity;
	if (str == "-Infinity")return -Infinity;
	if (str == "")return "";

	var reg16 = /^(?:0x|#)([a-f\d]+)$/i;
	var reg10 = /^[\-\+]?\d*(?:\.\d+)?(%\.*)?$/;
	var reg8 = /^0([0-7]+)$/;
	if (reg16.test(str))return parseInt(RegExp.$1, 16);
	if (reg8.test(str))return parseInt(RegExp.$1, 8);
	if (reg10.test(str))return parseFloat(str) / (RegExp.$1.length > 0 ? Math.pow(10,RegExp.$1.length+1) : 1);

	return str;
}

/*
 * 读取配置
 *
 * @param  appName:String           应用程序名称。用于保存数据，如果没有指定采用当前文档文件名
 * @param  confObj:String           配置对象. 没有则创建一个新的对象
 *
 * @return  Object
 */
function getConfig(appName, confObj){
	return dom.documentHasData(appName) 
			? objCombine(confObj || {}, JSON.parse(dom.getDataFromDocument(appName)), true) 
			: null;
}

/*
 * 保存配置
 *
 * @param  appName:String           应用程序名称。用于保存数据，如果没有指定采用当前文档文件名
 * @param  confName:Object          完整配置
 *
 * @return  Object
 */
function setConfig(appName, conf){
	if(conf === null){
		dom.removeDataFromDocument(appName);
	}else{
		dom.addDataToDocument(appName, "string", JSON.stringify(conf));
	}
}

/**
 * 合并两个对象
 * 如果有同属性数据, 以obj2为准
 *
 * @param  obj1:Object            
 * @param  obj2:Object            
 * @param  noMod:Boolean           是否修改原始对象. 默认修改
 */
function objCombine(obj1, obj2, mod){
	var obj = mod === false ? objCombine({}, obj1) : obj1;
	for(var p in obj2){
		if(obj2[p] instanceof Array){
			obj[p] = obj2[p].concat([]);
		}else if(typeof obj2[p] == "object"){
			obj[p] = objCombine({}, obj2[p]);
		}else {
			obj[p] = obj2[p];
		}
	}
	return obj;
}