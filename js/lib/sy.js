//检测网络环境是否链接
function networkLink(){
	var tag;
	if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
//		mui.alert("网络异常，请检查网络设置！", function(){
//			alert(123);
//		});
		tag = false;
		mui.toast("网络异常，请检查网络设置！");
	}else{
		tag = true;
	}
	return tag;
}
