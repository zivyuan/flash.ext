/*
 * 使用外部编辑器编辑帧脚本
 *
 * @Author              ziv.yuan(ziv.yuan@gmail.com)
 * @CreateDate
 * @Version             v1.0
 * @Introduce
 *                      使用外部编辑器编辑帧脚本
 *                        建议修改快捷键为 F9.
 *                        第一次按快捷键为 导出脚本 到外部编辑器
 *                        第二次按快捷键为 导入脚本
 */

/*
 * 调用公共库
 * 所有公共库必需存放在 ziv.package 目录下
 * 
 * @param  libname:String     调用的库名和方法名. 格式: 公共库名.方法名;
 *                            如果省略库名则采用 common.jsfl
 */
function run(libname){
	var dot = libname.indexOf(".");
	var lib = dot == -1 ? "common.jsfl" : (libname.substr(0, dot) + ".jsfl");
	var fun = dot == -1 ? libname : libname.substr(dot + 1);
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

function createTag(){
	return (Math.random()+"").substr(2);
}

function setTag(script){
	return "/** EX-EDITTAG:" + createTag() + " **/\r\n" + script;
}

function getTag(script){
	var tag = /\/\*\* EX-EDITTAG:(\d+) \*\*\//;
	var tags = script.match(tag);
	if(tags && tags.length > 1){
		return tags[1];
	}
	return null;
}

function removeTag(script){
	var tag = /\/\*\* EX-EDITTAG:\d+ \*\*\/[\r\n]*/g;
	return script.replace(tag, "");
}

function main(){
	var dom = fl.getDocumentDOM();
	//检查文档是否保存过
	if(dom.path == undefined){
		if(!dom.save()){
			alert("请先保存文件!");
			return;
		}
	}
	var as = fl.actionsPanel.getText()||"";
	var tag = getTag(as);
	var fname = run("toURI", dom.path + ".ex-editer.as");
	
	if(tag === null){
		//更新帧脚本到文件
		as = setTag(as);
		fl.actionsPanel.setText(as);
		FLfile.write(fname, as);
		fl.trace("发送脚本到外部编辑器. \n" + run("toURL", fname));
	}else{
		//更新文件到帧
		var script2 = FLfile.exists(fname) ? FLfile.read(fname) : "";
		var tag2 = getTag(script2);
		if(tag != tag2){
			if(!confirm("外部编辑器文件标记不匹配, 是否强制更新?")){
				//不更新, 清除标记
				fl.actionsPanel.setText(removeTag(fl.actionsPanel.getText()));
				return;
			}
		}
		fl.actionsPanel.setText(removeTag(script2));
		fl.actionsPanel.setSelection(fl.actionsPanel.getText().length-1,0);
		fl.trace("脚本已更新");
	}
}

var _path_lib = fl.configURI + "Commands/ziv.package/";
var _path_conf = fl.configURI + "Commands/ziv.configs/";

main();