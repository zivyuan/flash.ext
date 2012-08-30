function setScript(script){
	fl.actionsPanel.setText(script.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, ""));
}
function getScript(){
	return fl.actionsPanel.getText();
}
/*
 * 在脚本中检索指令, 反回一个以 \r 连接的字串
 *
 * 每条指令独占一行, 以注释加尖括号"//>" 开始, 后面紧跟指令名称, 再接一个空格后跟参数
 *   //>ver v1.24
 * 指令名称可以是[a-zA-Z0-9_\?\*\-\+], 字符出现位置无限制.
 *
 * @param  script:String      AS 脚本. 如果没有传入脚本则从当前页面抓取
 *
 * @return  String
 */
function getCommands(script){
	var cmd = /^\/\/>[a-zA-Z0-9_\?\*\-\+]+([ \t].+)?$/gm;
	var cmds = script.match(cmd);
	if(cmds !== null){
		for(var i=0;i<cmds.length;i++){
			cmds[i] = cmds[i].replace(/[ \t]+/, "\r").substr(3).split("\r");
		}
		return cmds;
	}else{
		return [];
	}
}
/*
 * 移除脚本里的指令
 *
 * @param  script:String      AS 脚本
 * @param  list:String        需要清除的指令表, 没有则全部清除
 *
 * @return  String
 */
function removeCommands(script, list){
	var cmd = /^\/\/>[a-zA-Z0-9_\?\*\-\+]+.*(?:[\r\n]+)?/gm;
	return script.replace(cmd, "");
}

function getCommand(cmdList, cmdName){
	var reg = new RegExp();
	for(var i=0;i<cmdList.length;i++){
		if(cmdList[i][0] == cmdName){
			return cmdList[i][1];
		}
	}
	return null;
}