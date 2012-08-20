/*
 * 复制对象滤镜为AS脚本
 * @author:      ziv.yuan@gmail.com
 * @date:        2012-08-20
 *
 */
var UNDEFINED;
function defaultParam(v, def){
	return (v==UNDEFINED || v==null || isNaN(v))? (v !== 0 ? def : 0) : v;
}

var __cp = {
};
// #RGBA
__cp.getColor = function (color){
	return '0x' + color.substr(1, 6);
};
__cp.getAlpha = function (alpha){
	return alpha.length == 7 
				? 1
				: Math.round(parseInt(alpha.substr(7), 16)/255*100)/100;
};
// new GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
__cp.glowFilter = function (filter){
	var params = [
		__cp.getColor(filter.color),
		__cp.getAlpha(filter.color),
		filter.blurX,
		filter.blurY,
		filter.strength,
		'BitmapFilterQuality.' + filter.quality.toUpperCase(),
		filter.inner,
		filter.knockout
	];

	return 'filter = new GlowFilter('+params.join(', ')+');';
};
// new BlurFilter(blurX, blurY, quality);
__cp.blurFilter = function (filter){
	var params = [
		filter.blurX,
		filter.blurY,
		'BitmapFilterQuality.' + filter.quality.toUpperCase()
	];
	var str = 'filter = new BlurFilter('+params.join(', ')+');';
	return str;
};
// new DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject)
__cp.dropShadowFilter = function (filter){
	var params = [
		filter.distance,
		filter.angle,
		__cp.getColor(filter.color),
		__cp.getAlpha(filter.color),
		filter.blurX,
		filter.blurY,
		filter.strength,
		'BitmapFilterQuality.' + filter.quality.toUpperCase(),
		filter.inner,
		filter.knockout,
		filter.hideObject
	];
	return 'filter = new DropShadowFilter('+params.join(', ')+');';
};
// new BevelFilter(distance, angle, highlightColor, highlightAlpha, shadowColor, shadowAlpha, blurX, blurY, strength, quality, type, knockout)
__cp.bevelFilter = function (filter){
	var params = [
		filter.distance,
		filter.angle,
		__cp.getColor(filter.highlightColor),
		__cp.getAlpha(filter.highlightColor),
		__cp.getColor(filter.shadowColor),
		__cp.getAlpha(filter.shadowColor),
		filter.blurX,
		filter.blurY,
		filter.strength,
		'BitmapFilterQuality.' + filter.quality.toUpperCase(),
		'BitmapFilterType.' + filter.type.toUpperCase(),
		filter.knockout
	];
	return 'filter = new BevelFilter('+params.join(', ')+');';
};
// new GradientGlowFilter(distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout)
__cp.gradientGlowFilter = function (filter){
	var cs=[],ca=[];
	for(var i=0;i<filter.colorArray.length; i++){
		cs.push(__cp.getColor(filter.colorArray[i]));
		ca.push(__cp.getAlpha(filter.colorArray[i]));
	}
	var params = [
		filter.distance,
		filter.angle,
		'['+cs+']',
		'['+ca+']',
		'['+filter.posArray+']',
		filter.blurX,
		filter.blurY,
		filter.strength,
		'BitmapFilterQuality.' + filter.quality.toUpperCase(),
		'BitmapFilterType.' + filter.type.toUpperCase(),
		filter.knockout
	];
	return 'filter = new GradientGlowFilter('+params.join(', ')+');';
};
// new GradientBevelFilter(distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout)
__cp.gradientBevelFilter = function (filter){
	var cs=[],ca=[];
	for(var i=0;i<filter.colorArray.length; i++){
		cs.push(__cp.getColor(filter.colorArray[i]));
		ca.push(__cp.getAlpha(filter.colorArray[i]));
	}
	var params = [
		filter.distance,
		filter.angle,
		'['+cs+']',
		'['+ca+']',
		'['+filter.posArray+']',
		filter.blurX,
		filter.blurY,
		filter.strength,
		'BitmapFilterQuality.' + filter.quality.toUpperCase(),
		'BitmapFilterType.' + filter.type.toUpperCase(),
		filter.knockout
	];
	return 'filter = new GradientBevelFilter('+params.join(', ')+');';
};
// ---FP10 里没有这个类?
__cp.adjustColorFilter = function (filter){
	return '// 暂时不支持色彩调整转换\nfilter = null;';
	/*
brightness: 48
contrast: 54
saturation: -33
hue: 85
*/
};


/*
 * 复制滤镜为AS脚本
 *
 * @param   object
 */
function copyFiltersToAS(movieclip){
	var filters = movieclip.filters;
	var filter, filter_str=[], str;
	if(filters && filters.length > 0){
		for(var i=0; i<filters.length; i++){
			filter = filters[i];
			if(__cp[filter.name]){
				str = __cp[filter.name](filter);
				if(!(/^\/\//.test(str)))
					filter_str.push(str + '\nfilters.push(filter);');
			}else{
				// for(var k in filter){
				//	fl.trace(k + ': ' + filter[k]);
				//}
			}
		}
	}
	if(filter_str.length > 0){
		return 'var filters:Array = [];\nvar filter:BitmapFilter;' + filter_str.join('\n');
	}else{
		return '';
	}
}


/*
 * the main function
 */
function main(){
	if(sel.length == 0){
		fl.trace("必须选择复制对象");
		return;
	}

	var inst = sel[0];
	var tf = /instance|textfield/;
	if(!tf.test(inst.elementType)){
		fl.trace('请选择影片剪辑或文本框.');
		return;
	}

	fl.outputPanel.clear();
	var filters = copyFiltersToAS(inst);
	fl.trace(filters == '' ? '对象没有添加滤镜或滤镜不被支持.' : filters);
}

//
var dom = fl.getDocumentDOM();
var sel = dom.selection;
//
main();