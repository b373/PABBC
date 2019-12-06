function example(){
//获取输入框
var keyword = $("#keyword");
//获取内容显示区域
var contents = $("#counters");
//获取输入框的值
var keywordval = keyword.val();
//调用拆分方法
var sount=ParsingWords(keywordval);
//写出值
contents.html(sount);
}
function ParsingWords(str){
	//替换说有英文符号
	str=str.replace(/\./g,',');
	str=str.replace(/;/g,',');
	str=str.replace(/:/g,',');
	str=str.replace(/"/g,',');
	str=str.replace(/'/g,',');
	str=str.replace(/\?/g,',');
	str=str.replace(/\(/g,',');
	str=str.replace(/\)/g,',');
	str=str.replace(/&/g,',');
	str=str.replace(/^/g,',');
	str=str.replace(/%/g,',');
	str=str.replace(/$/g,',');
	str=str.replace(/#/g,',');
	str=str.replace(/@/g,',');
	str=str.replace(/!/g,',');
	str=str.replace(/~/g,',');
	//替换所有中文符号
	str=str.replace(/。/g,',');
	str=str.replace(/？/g,',');
	str=str.replace(/‘/g,',');
	str=str.replace(/”/g,',');
	str=str.replace(/；/g,',');
	str=str.replace(/：/g,',');
	str=str.replace(/）/g,',');
	str=str.replace(/（/g,',');
	str=str.replace(/-/g,',');
	str=str.replace(/——/g,',');
	str=str.replace(/&/g,',');
	str=str.replace(/……/g,',');
	str=str.replace(/%/g,',');
	str=str.replace(/￥/g,',');
	str=str.replace(/#/g,',');
	str=str.replace(/@/g,',');
	str=str.replace(/！/g,',');
	str=str.replace(/~/g,',');
	alert(str);
	var sount='';
	//判断是否为单字符语种
	if(/[\u4e00-\u9fa5]/.test(str)){
		var date = str.split(',');
		for(var d = 0;d<date.length;d++){
			//alert(date[d].length)
			 for(var i=0 ; i<=date[d].length ;i++){
				for(var j=i ; j<=date[d].length ;j++){
					if(date[d].slice(i,j).length==0){
						continue;
					}
					sount+=date[d].slice(i,j)+'/';
				}
			 }
			 //contents.html(sount);
			 //alert(sount.length);
		}
	}else{
		var date = str.split(',');
		for(var d = 0;d<date.length;d++){
			var fz = date[d].split(' ');
			//alert(fz);
			for(var i=0 ; i<fz.length ;i++){
				for(var j=i ; j<fz.length ;j++){
					var ls = ''
					for(var k=i;k<=j;k++){
						ls+=fz[k]+' ';
					}
					sount+=ls.trim()+'/'
				}
			 }
			//alert(sount);
		}
	}
	return sount
}