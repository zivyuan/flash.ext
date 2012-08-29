/*
 *	库原件随机名称
 *		为了避免文件合并时出现重名的现象, 对库原件重命名. 同时保持以前的名称
 *
 *  使用说明:
 *      当选择超过一项是只对选择的项目重命名. 否则全部重命名
 *      注意, 选择文件夹会同时选中文件夹里的所有内容
 *
 *  Author:      ziv.yuan
 *  E-Mail:      ziv.yuan@qq.com
 */
function randomString(len){
	var def = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";
	var defl = def.length;
	var re = "";
	while(re.length < len){
		re += def.substr(Math.floor(Math.random()*defl), 1);
	}
	return re;
}
function getItemName(item){
	var np = "";
	var idx = item.name.lastIndexOf("/");
	var ra = / - \w{10}$/;
	if(idx>-1){
		np = item.name.substr(idx+1);
	}else{
		np = item.name;
	}

	return np.replace(ra, "");
}
//
var doc = fl.getDocumentDOM();
var lib = doc.library;
var items = lib.getSelectedItems();
if(items.length < 2){
	items = lib.items;
}

var len = items.length;
for(var i=0;i<len;i++){
	items[i].name = getItemName(items[i]) + " - " + randomString(10);
}