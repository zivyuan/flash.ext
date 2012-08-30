/*
 * 模拟 AS3 函数的 ...rest
 */
function _getRest(args, pos){
	var rest=[];
	for(var i=pos||1; i<args.length; i++){
		rest.push(args[i]);
	}
	return rest;
}

/*
 * 图层参数模型
 *
 * 利用图层名称存储简单数据
 * 数据结构为:  变量1[数据1, 数据2, ...];变量2[数据1, 数据2, ...];
 * 和图层名结合的格式:
 *  layer name ::parameter[]
 */
/*
 * 获取图层参数
 * @param   layer:Layer         图层
 * @param   prop:String         属性名称
 * @return
 *          Array               值数组
 */
function getLayerConfig(layer, prop){
	var c=layer.name;
	var ps,vs;
	var config;
	if(c.indexOf(__PARAM_KEY)>-1){
		c=c.substr(c.indexOf(__PARAM_KEY)+__PARAM_KEY.length);
		config={};
		ps=c.split(";");
		for(var i=0;i<ps.length;i++){
			if(ps[i].length==0)	continue;
			
			vs=ps[i].substr(ps[i].indexOf("[")+1);
			config[ps[i].substr(0,ps[i].indexOf("["))] = vs.substr(0,vs.length-1).split(",");
		}
		if(prop)	return config[prop];
		else		return config;
	}
	return null;
}

function setLayerConfig(layer, prop){
	if(prop && prop.length>0){
		var vals=_getRest(arguments,2);
		var config=getLayerConfig(layer,null)||{};
		if(vals.length==0){
			delete config[prop];
		}else{
			config[prop]=vals;
		}
		var flag=layer.name.indexOf(__PARAM_KEY);
		var ln=(flag>-1?layer.name.substr(0,flag):layer.name)+__PARAM_KEY;
		for(var c in config){
			ln+=c+"["+config[c].join(",")+"];";
		}
		//save new config
		layer.name = ln;
	}
}

/*
 * 编码图层变量
 */
function encodeValue(val){
	val=val.replace(/,/g,__COMMER);
	val=val.replace(/;/g,__COMMER2);
	val=val.replace(/\[/g,__BOX_LEFT);
	val=val.replace(/\]/g,__BOX_RIGHT);
}

/*
 * 解码图层变量
 */
function decodeValue(val){
	val=val.replace(/\$%1/g,",");
	val=val.replace(/\$%2/g,";");
	val=val.replace(/\$%3/g,"[");
	val=val.replace(/\$%4/g,"]");
}
//常量
var __PARAM_KEY = " ::";
var __COMMER='$%1';// ,
var __COMMER2='$%2';// ;
var __BOX_LEFT='$%3';// [
var __BOX_RIGHT='$%4';// ]

/* 测试脚本
var doc = fl.getDocumentDOM();
var tl = doc.getTimeline();
//selected layer idx
var sl = tl.getSelectedLayers();
getLayerConfig(tl.layers[sl[0]]);
setLayerConfig(tl.layers[sl[0]],"mod_time",new Date());
setLayerConfig(tl.layers[sl[0]],"hi");
//*/