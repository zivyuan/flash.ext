/*
 库文件整理v1.0
 制作:mm2004mx
 2004.1.7
*/
var lir = fl.getDocumentDOM().library;
var lirItem = lir.items;
//
// 忽略组件目录 Component Assets
//
var folderNames = ["■图形■","■图片■","■按钮■","■影片剪辑■","■视频■","■字体■","■声音■","■组件■","■标准组件-编译剪辑■","Component Assets"];
var fname = new RegExp("^(?:"+folderNames.join("|")+")$");
var graphic_list = [];
var button_list = [];
var movieclip_list = [];
var photo_list = [];
var sound_list = [];
var compent_list = [];
var video_list = [];
var folder_list = [];
var flashcompent_list = [];
var font_list = [];

//获取库文件列表
for (i=0; i<lirItem.length; i++) {
	if(fname.test(lirItem[i].name.replace(/\/.+/g, ''))){
		continue;
	}
	
	switch (lir.getItemType(lirItem[i].name)) {
		case "graphic" :
			graphic_list.push(lirItem[i]);
			break;
		case "button" :
			button_list.push(lirItem[i]);
			break;
		case "movie clip" :
			movieclip_list.push(lirItem[i]);
			break;
		case "video" :
			video_list.push(lirItem[i]);
			break;
		case "font" :
			font_list.push(lirItem[i]);
			break;
		case "sound" :
			sound_list.push(lirItem[i]);
			break;
		case "compiled clip" :
			flashcompent_list.push(lirItem[i]);
			break;
		case "component" :
			compent_list.push(lirItem[i]);
			break;
		case "bitmap" :
			photo_list.push(lirItem[i]);
			break;
		case "folder" :
			folder_list.push(lirItem[i]);
			break;
		default :
			fl.trace("库文件损坏!"+lir.getItemType(lirItem[i].name));
			break;
	}
}
if (graphic_list.length>0) {
	lir.newFolder("■图形■");
}
if (button_list.length>0) {
	lir.newFolder("■按钮■");
}
if (movieclip_list.length>0) {
	lir.newFolder("■影片剪辑■");
}
if (video_list.length>0) {
	lir.newFolder("■视频■");
}
if (font_list.length>0) {
	lir.newFolder("■字体■");
}
if (sound_list.length>0) {
	lir.newFolder("■声音■");
}
if (compent_list.length>0) {
	lir.newFolder("■组件■");
}
if (flashcompent_list.length>0) {
	lir.newFolder("■标准组件-编译剪辑■");
	lir.selectItem("■标准组件-编译剪辑■");
	lir.moveToFolder('■组件■');
}
if (photo_list.length>0) {
	lir.newFolder("■图片■");
}
for (i=0; i<movieclip_list.length; i++) {
	lir.selectItem(movieclip_list[i].name);
	lir.moveToFolder('■影片剪辑■');
}
for (i=0; i<graphic_list.length; i++) {
	lir.selectItem(graphic_list[i].name);
	lir.moveToFolder('■图形■');
}
for (i=0; i<button_list.length; i++) {
	lir.selectItem(button_list[i].name);
	lir.moveToFolder('■按钮■');
}
for (i=0; i<video_list.length; i++) {
	lir.selectItem(video_list[i].name);
	lir.moveToFolder('■视频■');
}
for (i=0; i<font_list.length; i++) {
	lir.selectItem(font_list[i].name);
	lir.moveToFolder('■字体■');
}
for (i=0; i<sound_list.length; i++) {
	lir.selectItem(sound_list[i].name);
	lir.moveToFolder('■声音■');
}
for (i=0; i<compent_list.length; i++) {
	lir.selectItem(compent_list[i].name);
	lir.moveToFolder('■组件■');
}
for (i=0; i<flashcompent_list.length; i++) {
	lir.selectItem(flashcompent_list[i].name);
	lir.moveToFolder('■组件■/■标准组件-编译剪辑■');
}
for (i=0; i<photo_list.length; i++) {
	lir.selectItem(photo_list[i].name);
	lir.moveToFolder('■图片■');
}
//clear lib
for (i=0; i<folder_list.length; i++) {
	try{
		lir.selectItem(folder_list[i].name);
		lir.deleteItem();
	}catch(err){
	}
}