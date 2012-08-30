/*
 * 检查目录是否存在，如果不存在则自动创建
 *
 * @param fileURI:String         目录或文件URI
 *
 * @return  Boolean              如果目录存在或创建功能返回 true, 否则返回 false.
 */
function validateFolder(fileURI){
	var paths = fileURI.split("/");
	var lost = [], folder;

	if(/([^\/\\]+\.[\w]+)$/.test(fileURI)){
		paths.pop();
	}

	do{
		if(FLfile.exists(paths.join("/"))){
			//目录存在，检查有没有需要创建的目录
			if(lost.length > 0){
				//从创建列表中取出目录，并尝试创建。如果失败则直接返回
				folder = lost.pop();
				if(FLfile.createFolder(paths.join("/") + "/" + folder)){
					paths.push(folder);
				}else{
					//目录创建失败
					return false;
				}
			}else{
				break;
			}
		}else{
			//目录不存在则将当前目录压入创建列表
			lost.push(paths.pop());
		}
	}while(paths.length > 0);
	//
	return paths.length > 0;
}

/*
 * 复制文件
 *
 * 比 FLfile.copy 多一个参数, 指定当文件存在时是否覆盖
 */
function copyFile(sourceURI, targetURI, overwrite){
	validateFolder(sourceURI);
	if(!FLfile.exists(sourceURI))
		return false;
	if(overwrite == true || overwrite == "true"){
		if(FLfile.exists(targetURI)){
			return FLfile.remove(targetURI);
		}
	}
	return FLfile.copy(sourceURI, targetURI);
}

/*
 * 写文件。如果文件不存在则自动创建
 *
 * @param  fileURI:String         文件 uri
 * @param  content:String         文件内容
 * @param  append:Boolean         如果是添加还是覆盖源文件
 *
 * @return  Boolean               操作成功返回 true，失败返回 false。
 */
function writeFile(fileURI, content, append){
	if(validateFolder(fileURI)){
		return FLfile.write(fileURI, content, append);
	}else{
		return false;
	}
}
