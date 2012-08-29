/**
 * 发布所有打开的 FLA 文档
 *
 * @Date:                2010.01.18
 * @Author:              ziv.yuan(ziv.yuan@gmail.com)
 */

/*
 * 发布下一个打开的文档
 */
function publishNext()
{
	count++;
	if(count == l) return;
	else if(count == l - 1) fl.closeAllPlayerDocuments();
	fl.setActiveWindow(fl.documents[count]);
	fl.getDocumentDOM().publish();
	publishNext();
}

function main(){
	publishNext();
}

var l = fl.documents.length;
var count = -1;

main();