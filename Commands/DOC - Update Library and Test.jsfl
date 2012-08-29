/**
 * 更新元件并测试文档
 *
 * 该命令适合多人分工协作时, 一人做脚本, 另一人做动画
 * 这样可以避免做脚本的人每次测试都会自动更新动画带来
 * 的时间消耗
 *
 * @Date                   2010.01.18
 * @Author                 ziv.yuan(ziv.yuan@gmail.com)
 *
 */

function main(){
	var doc=fl.getDocumentDOM();
	var did=doc.id;
	var lib=doc.library;
	var len=lib.items.length;
	var item;
	var mes=[];
	
	var count=0;
	for(var i=0;i<len;i++){
		item = lib.items[i];
		if(item instanceof SymbolItem){
			if(item.sourceFilePath.length > 0){
				item.sourceAutoUpdate = true;
				count++;
				//create update logo
				//fl.trace("update ["+item.name+"] from ["+item.sourceFilePath+"]");
			}
		}
	}

	doc.testMovie();
	
	doc=fl.findDocumentDOM(did);
	lib=doc.library;
	len=lib.items.length;
	for(var i=0;i<len;i++){
		item = lib.items[i];
		if(item instanceof SymbolItem){
			if(item.sourceFilePath && item.sourceFilePath != ""){
				item.sourceAutoUpdate = false;
			}
		}
	}
}

main();